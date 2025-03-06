import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feature-contatti',
  templateUrl: './feature-contatti.component.html',
  styleUrls: ['./feature-contatti.component.css']
})
export class FeatureContattiComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {}

  sendMessage(){
    this.toastr.success('Messaggio inviato con successo!', 'Grazie per averci contattato!');
  }

}
