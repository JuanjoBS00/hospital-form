import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

interface Patient{
  id: number;
  nombre: String;
  apellidos: String;
  telefono: Number;
  dni: String;
  tarjetaSanitaria: String;
  enfermedad: String;
}

@Component({
  selector: 'app-form-material',
  templateUrl: './form-material.component.html',
  styleUrls: ['./form-material.component.css']
})

export class FormMaterialComponent implements OnInit {

  // User interface text
  formtitle="Introduzca los datos del paciente: ";
  tabletitle="A continuación puede observar, modificar o eliminar los pacientes existentes: ";

  //Variables related to buttons visibility
  addbtnVisibility = true;
  updatebtnVisibility = false;

  // CRUD Table Configuration
  @ViewChild(MatTable) table!: MatTable<Element>; 
  tableColumns: string[] = ['id','nombre', 'apellidos', 'telefono', 'dni', 'tarjetaSanitaria', 'enfermedad', 'editar', 'eliminar']; 

  // Crearion of a patient and an array of patients where they will be stored
  patient!: Patient;
  patientlist: Patient[] = [];

  constructor() { }

  ngOnInit(): void {
    this.resetForm();
  }

  // Auxiliary methods
  resetForm() {
    this.patient = {id: 0, nombre : "", apellidos: "", telefono: 928112233, dni: "", tarjetaSanitaria: "", enfermedad: ""};
  }

  verifyUpdate () {
    this.addbtnVisibility = true;
    this.updatebtnVisibility = false;
    this.resetForm();
  }


  // CRUD methods

  addPatient(){
    var newPatientId = -1;

    for(var i = 0; i < this.patientlist.length; i++) {
      if(this.patientlist[i].id > newPatientId) {
          newPatientId = this.patientlist[i].id;
      }
    }

    newPatientId++;
    this.patient.id = newPatientId; 
    this.patientlist.push(this.patient);
    this.table.renderRows();
    this.resetForm();

  }


  removePatient(idPatient: number){
    for(var i = 0; i < this.patientlist.length; i++) {
      if(this.patientlist[i].id == idPatient) {
        this.patientlist.splice(i, 1);
        this.table.renderRows();
        this.resetForm();
      }
    }
  }

  updatePatient(idPatient: number){
    this.addbtnVisibility = false;
    this.updatebtnVisibility = true;

    for(var i = 0; i < this.patientlist.length; i++) {
      if(this.patientlist[i].id == idPatient) {
        this.patient = this.patientlist[i];
      }
    }
  }
}


