import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ElectricalMachines } from './electrical-machines.model';
import { ElectricalMachinesService } from './electrical-machines.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'page-electrical-machines-update',
  templateUrl: 'electrical-machines-update.html',
})
export class ElectricalMachinesUpdatePage implements OnInit {
  electricalMachines: ElectricalMachines;
  users: User[];
  warranty: string;
  createdOn: string;
  updatedOn: string;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [null, []],
    equipmentName: [null, []],
    equipmentBrand: [null, []],
    equipmentType: [null, []],
    warranty: [null, []],
    batteryCapacity: [null, []],
    status: [null, []],
    createdOn: [null, []],
    updatedOn: [null, []],
    createdBy: [null, [Validators.required]],
    updatedBy: [null, [Validators.required]],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private userService: UserService,
    private electricalMachinesService: ElectricalMachinesService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.userService.findAll().subscribe(
      data => (this.users = data),
      error => this.onError(error)
    );
    this.activatedRoute.data.subscribe(response => {
      this.electricalMachines = response.data;
      this.isNew = this.electricalMachines.id === null || this.electricalMachines.id === undefined;
      this.updateForm(this.electricalMachines);
    });
  }

  updateForm(electricalMachines: ElectricalMachines) {
    this.form.patchValue({
      id: electricalMachines.id,
      equipmentName: electricalMachines.equipmentName,
      equipmentBrand: electricalMachines.equipmentBrand,
      equipmentType: electricalMachines.equipmentType,
      warranty: this.isNew ? new Date().toISOString() : electricalMachines.warranty,
      batteryCapacity: electricalMachines.batteryCapacity,
      status: electricalMachines.status,
      createdOn: this.isNew ? new Date().toISOString() : electricalMachines.createdOn,
      updatedOn: this.isNew ? new Date().toISOString() : electricalMachines.updatedOn,
      createdBy: electricalMachines.createdBy,
      updatedBy: electricalMachines.updatedBy,
    });
  }

  save() {
    this.isSaving = true;
    const electricalMachines = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.electricalMachinesService.update(electricalMachines));
    } else {
      this.subscribeToSaveResponse(this.electricalMachinesService.create(electricalMachines));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ElectricalMachines>>) {
    result.subscribe(
      (res: HttpResponse<ElectricalMachines>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({
      message: `ElectricalMachines ${action} successfully.`,
      duration: 2000,
      position: 'middle',
    });
    await toast.present();
    await this.navController.navigateBack('/tabs/entities/electrical-machines');
  }

  previousState() {
    window.history.back();
  }

  async onError(error) {
    this.isSaving = false;
    console.error(error);
    const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
    await toast.present();
  }

  private createFromForm(): ElectricalMachines {
    return {
      ...new ElectricalMachines(),
      id: this.form.get(['id']).value,
      equipmentName: this.form.get(['equipmentName']).value,
      equipmentBrand: this.form.get(['equipmentBrand']).value,
      equipmentType: this.form.get(['equipmentType']).value,
      warranty: new Date(this.form.get(['warranty']).value),
      batteryCapacity: this.form.get(['batteryCapacity']).value,
      status: this.form.get(['status']).value,
      createdOn: new Date(this.form.get(['createdOn']).value),
      updatedOn: new Date(this.form.get(['updatedOn']).value),
      createdBy: this.form.get(['createdBy']).value,
      updatedBy: this.form.get(['updatedBy']).value,
    };
  }

  compareUser(first: User, second: User): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackUserById(index: number, item: User) {
    return item.id;
  }
}
