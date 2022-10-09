import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { InputArray } from "src/app/models/inputs";

@Component({
  selector: 'input-array',
  templateUrl: './inputarray.components.html',
  styleUrls: ['./inputarray.component.scss']
})

export class InputArrayComponent implements OnInit{
  public items: string[] = [];
  public stringItems: string = '';
  public dataSaved =  {};

  @Input() title: string;
  @Input() type: InputArray;
  @Input() values: string[];

  @Input() dataFetched: string | [] | null;

  @Output() dataOutput = new EventEmitter<string[]>();

  @Output() dataObjectOutput = new EventEmitter<{}>();
  //@Output() dataString = new EventEmitter<string>();

  constructor(){}

  ngOnInit(): void {
    this.setData();

  }

  onAdd(item: any) {
    this.dataOutput.emit(this.items)
  }

  onRemove(item: any) {
    this.dataOutput.emit(this.items)
  }

  addDataObject(data: any){
    let formInputs: any = data.path[1];
    let ids = Object.keys(formInputs);

    ids.map( id => {
      let element = formInputs[id];
      if(element.nodeName === 'INPUT') {

        this.dataSaved = {...this.dataSaved, [element.parentElement.firstChild.innerHTML]: element.parentElement.lastChild.value }
      }

    })

    this.dataObjectOutput.emit(this.dataSaved);

  }

  setData(){
    let dataParsed;

    if(!this.dataFetched) return;

    if(typeof this.dataFetched === 'string') dataParsed = JSON.parse(this.dataFetched);

    if(this.type === 'tag') return this.items = dataParsed;

    this.dataSaved = dataParsed;
    return
  }
}
