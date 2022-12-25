import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MechanicalMachines } from './mechanical-machines.model';
import { MechanicalMachinesService } from './mechanical-machines.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'page-mechanical-machines-update',
  templateUrl: 'mechanical-machines-update.html',
})
export class MechanicalMachinesUpdatePage implements OnInit {
  mechanicalMachines: MechanicalMachines;
  users: User[];
  warranty: string;
  createdOn: string;
  updatedOn: string;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [null, []],
    machineName: [null, []],
    machineBrand: [null, []],
    machineType: [null, []],
    warranty: [null, []],
    capacity: [null, []],
    length: [null, []],
    width: [null, []],
    height: [null, []],
    status: [null, []],
    createdOn: [null, []],
    updatedOn: [null, []],
    createdBy: [null, [Validators.required]],
    updatedBy: [null, [Validators.required]],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: UntypedFormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private userService: UserService,
    private mechanicalMachinesService: MechanicalMachinesService
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
      this.mechanicalMachines = response.data;
      this.isNew = this.mechanicalMachines.id === null || this.mechanicalMachines.id === undefined;
      this.updateForm(this.mechanicalMachines);
    });
  }

  updateForm(mechanicalMachines: MechanicalMachines) {
    this.form.patchValue({
      id: mechanicalMachines.id,
      machineName: mechanicalMachines.machineName,
      machineBrand: mechanicalMachines.machineBrand,
      machineType: mechanicalMachines.machineType,
      warranty: this.isNew ? new Date().toISOString() : mechanicalMachines.warranty,
      capacity: mechanicalMachines.capacity,
      length: mechanicalMachines.length,
      width: mechanicalMachines.width,
      height: mechanicalMachines.height,
      status: mechanicalMachines.status,
      createdOn: this.isNew ? new Date().toISOString() : mechanicalMachines.createdOn,
      updatedOn: this.isNew ? new Date().toISOString() : mechanicalMachines.updatedOn,
      createdBy: mechanicalMachines.createdBy,
      updatedBy: mechanicalMachines.updatedBy,
    });
  }

  save() {
    this.isSaving = true;
    const mechanicalMachines = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.mechanicalMachinesService.update(mechanicalMachines));
    } else {
      this.subscribeToSaveResponse(this.mechanicalMachinesService.create(mechanicalMachines));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<MechanicalMachines>>) {
    result.subscribe(
      (res: HttpResponse<MechanicalMachines>) => this.onSaveSuccess(res),
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
      message: `MechanicalMachines ${action} successfully.`,
      duration: 2000,
      position: 'middle',
    });
    await toast.present();
    await this.navController.navigateBack('/tabs/entities/mechanical-machines');
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

  private createFromForm(): MechanicalMachines {
    return {
      ...new MechanicalMachines(),
      id: this.form.get(['id']).value,
      machineName: this.form.get(['machineName']).value,
      machineBrand: this.form.get(['machineBrand']).value,
      machineType: this.form.get(['machineType']).value,
      warranty: new Date(this.form.get(['warranty']).value),
      capacity: this.form.get(['capacity']).value,
      length: this.form.get(['length']).value,
      width: this.form.get(['width']).value,
      height: this.form.get(['height']).value,
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
