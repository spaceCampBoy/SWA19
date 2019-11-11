import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-query-panel',
  templateUrl: './query-panel.component.html',
  styleUrls: ['./query-panel.component.css']
})
export class QueryPanelComponent implements OnInit {
  @Output() query = new EventEmitter();
  type;
  city;
  from;
  to;
  constructor() { }

  ngOnInit() {
  }

  change()
  {
    const query = {
      type:this.type,
      city:this.city,
      from:this.from,
      to:this.to
    };
    
    this.query.emit(query);
  }
}
