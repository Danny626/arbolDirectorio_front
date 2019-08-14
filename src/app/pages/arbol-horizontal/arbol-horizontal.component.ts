import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import panzoom from 'panzoom';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ContextMenu, Tree, TreeNode } from 'primeng/primeng';
import { Subscription } from 'rxjs';
import { Nodo } from 'src/app/interfaces/interfaces';
import { NodeService } from '../../_service/node.service';

@Component({
  selector: 'app-arbol-horizontal',
  templateUrl: './arbol-horizontal.component.html',
  styleUrls: ['./arbol-horizontal.component.scss']
})
export class ArbolHorizontalComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('expandingTree', { static: false })
  expandingTree: Tree;

  filesTree: TreeNode[];

  filesTree2: TreeNode[];

  filesTreeFull: TreeNode[];

  filesTreeFiles: Nodo[] = [];

  selectedFile: TreeNode;

  selectedFile2: TreeNode;

  loading: boolean = true;

  displayDialog = false;

  displayDialogBuscar = false;

  displayDialogDoc = false;

  itemsPDF: MenuItem[];

  itemsOtros: MenuItem[];

  itemsGral: MenuItem[];

  pdfSrc = '';

  visibleSidebar;

  @ViewChild('contextMenuGral', { static: false }) contextMenuGral: ContextMenu;

  cargando: string = 'Cargando...';

  private subscription: Subscription;

  @ViewChild('scene', { static: false }) scene: ElementRef;
  panZoomController;
  zoomLevels: number[];
  currentZoomLevel: number;

  zoom() {
    const isSmooth = false;
    const scale = this.currentZoomLevel;

    if (scale) {
      const transform = this.panZoomController.getTransform();
      const deltaX = transform.x;
      const deltaY = transform.y;
      const offsetX = scale + deltaX;
      const offsetY = scale + deltaY;

      if (isSmooth) {
        this.panZoomController.smoothZoom(0, 0, scale);
      } else {
        this.panZoomController.zoomTo(offsetX, offsetY, scale);
      }
    }
  }

  zoomToggle(zoomIn: boolean) {
    const idx = this.zoomLevels.indexOf(this.currentZoomLevel);
    if (zoomIn) {
      if (typeof this.zoomLevels[idx + 1] !== 'undefined') {
        this.currentZoomLevel = this.zoomLevels[idx + 1];
      }
    } else {
      if (typeof this.zoomLevels[idx - 1] !== 'undefined') {
        this.currentZoomLevel = this.zoomLevels[idx - 1];
      }
    }
    if (this.currentZoomLevel === 1) {
      this.panZoomController.moveTo(0, 0);
      this.panZoomController.zoomAbs(0, 0, 1);
    } else {
      this.zoom();
    }
  }

  ngAfterViewInit() {
    this.zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
    this.currentZoomLevel = this.zoomLevels[4];
    // panzoom(document.querySelector('#scene'));
    this.panZoomController = panzoom(this.scene.nativeElement);
  }

  constructor(
    private nodeService: NodeService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.subscription = this.nodeService.getFiles().subscribe(tree => {
      this.loading = true;
      // this.filesTree13 = [
      //   {
      //     label: 'Root',
      //     children: files
      //   }
      // ];

      const source: any = tree.data;
      // sessionStorage.setItem('fullTree', JSON.stringify(tree.data));
      const arbol = [this.removeFromTree(source[0], 'file')];
      this.filesTree = arbol as TreeNode[];

      // this.filesTree.forEach(node => {
      //   this.expandRecursive(node, true);
      // });
    });
    this.loading = false;

    // inicio carga lazy
    // this.nodeService
    //   .getLazyFolders({ data: '\\\\192.168.200.96\\SGC_2', nivel: 0 })
    //   .subscribe(files => {
    //     this.loading = true;
    //     this.filesTree = files.data as TreeNode[];
    //     // this.filesTree.forEach(node => {
    //     //     this.expandRecursive(node, true);
    //     // });
    //     this.loading = false;
    //   });
    // fin carga lazy

    this.itemsPDF = [
      {
        label: 'Ver Documento',
        icon: 'fa fa-eye',
        command: event => this.viewFile(this.selectedFile2)
      },
      {
        label: 'Descargar Archivo',
        icon: 'fa fa-download',
        command: event => this.descargarArchivo(this.selectedFile2)
      },
      {
        label: 'Deseleccionar',
        icon: 'fa fa-close',
        command: event => this.unselectFile()
      }
    ];

    this.itemsOtros = [
      {
        label: 'Descargar Archivo',
        icon: 'fa fa-download',
        command: event => this.descargarArchivo(this.selectedFile2)
      },
      {
        label: 'Deseleccionar',
        icon: 'fa fa-close',
        command: event => this.unselectFile()
      }
    ];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeFromTree(parent, childNameToRemove) {
    parent.children = parent.children
      .filter(child => {
        if (child.type === 'file') {
          this.filesTreeFiles.push(child);
        }
        return child.type !== childNameToRemove;
      })
      .map(child => {
        return this.removeFromTree(child, childNameToRemove);
      });
    return parent;
  }

  loadNode(event) {
    if (event.node) {
      this.nodeService
        .getLazyFolders({ data: event.node.data, nivel: 1 })
        .subscribe(nodes => {
          this.loading = true;
          event.node.children = nodes;
          // this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);
          this.loading = false;
        });
    }
  }

  nodeSelectArbol(event) {
    this.nodeService
      .getLazyFiles({ data: event.node.data, nivel: null })
      .subscribe(files => {
        this.loading = true;
        this.filesTree2 = files.data as TreeNode[];
        this.loading = false;
        this.displayDialog = true;
      });
  }

  expandAll() {
    this.filesTree.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.filesTree.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  showBuscar() {
    this.displayDialogBuscar = true;
    // const arbolSession = JSON.parse(sessionStorage.getItem('fullTree'));
    this.filesTreeFull = this.filesTreeFiles as TreeNode[];
  }

  confirmarActualizacion() {
    this.confirmationService.confirm({
      message: 'Esta acción puede demorar unos minutos. Desea continuar?',
      accept: () => {
        this.nodeService.createJsonFile().subscribe(result => {
          this.nodeService.getFiles().subscribe(tree => {
            const source: any = tree.data;
            const arbol = [this.removeFromTree(source[0], 'file')];
            this.filesTree = arbol as TreeNode[];
          });
        });
      }
    });
  }

  viewFile(file: TreeNode) {
    this.pdfSrc = null;
    this.displayDialogDoc = true;

    this.nodeService.getFileByte(file.data).subscribe(data => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result; // base64
      };
      reader.readAsArrayBuffer(data);
    });
  }

  descargarArchivo(file: TreeNode) {
    this.nodeService.getFileByte(file.data).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = `${file.label}`;
      a.click();
      return url;
    });
  }

  unselectFile() {
    this.selectedFile2 = null;
  }

  nodeSelect(event: any) {
    const type = event.node.label.substr(-3);

    if (type === 'pdf') {
      this.itemsGral = this.itemsPDF;
      // this.contextMenuPDF.show(event);
    } else {
      this.itemsGral = this.itemsOtros;
      // this.contextMenuOtros.show(event);
    }
  }

  nodeSelectTable(event: any) {
    const type = event.data.label.substr(-3);

    if (type === 'pdf') {
      this.itemsGral = this.itemsPDF;
    } else {
      this.itemsGral = this.itemsOtros;
    }
  }
}
