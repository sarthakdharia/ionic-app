import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Building } from './building.model';
import { BuildingService } from './building.service';
import { Address, AddressService } from '../address';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'page-building-update',
  templateUrl: 'building-update.html',
})
export class BuildingUpdatePage implements OnInit {
  building: Building;
  addresses: Address[];
  users: User[];
  createdOn: string;
  updatedOn: string;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [null, []],
    category: [null, []],
    name: [null, []],
    floors: [null, []],
    createdOn: [null, []],
    updatedOn: [null, []],
    address: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    updatedBy: [null, [Validators.required]],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private addressService: AddressService,
    private userService: UserService,
    private buildingService: BuildingService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.addressService.query({ filter: 'building-is-null' }).subscribe(
      data => {
        if (!this.building.address || !this.building.address.id) {
          this.addresses = data.body;
        } else {
          this.addressService.find(this.building.address.id).subscribe(
            (subData: HttpResponse<Address>) => {
              this.addresses = [subData.body].concat(subData.body);
            },
            error => this.onError(error)
          );
        }
      },
      error => this.onError(error)
    );
    this.userService.findAll().subscribe(
      data => (this.users = data),
      error => this.onError(error)
    );
    this.activatedRoute.data.subscribe(response => {
      this.building = response.data;
      this.isNew = this.building.id === null || this.building.id === undefined;
      this.updateForm(this.building);
    });
  }

  updateForm(building: Building) {
    this.form.patchValue({
      id: building.id,
      category: building.category,
      name: building.name,
      floors: building.floors,
      createdOn: this.isNew ? new Date().toISOString() : building.createdOn,
      updatedOn: this.isNew ? new Date().toISOString() : building.updatedOn,
      address: building.address,
      createdBy: building.createdBy,
      updatedBy: building.updatedBy,
    });
  }

  save() {
    this.isSaving = true;
    const building = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.buildingService.update(building));
    } else {
      this.subscribeToSaveResponse(this.buildingService.create(building));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Building>>) {
    result.subscribe(
      (res: HttpResponse<Building>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Building ${action} successfully.`, duration: 2000, position: 'middle' });
    await toast.present();
    await this.navController.navigateBack('/tabs/entities/building');
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

  private createFromForm(): Building {
    return {
      ...new Building(),
      id: this.form.get(['id']).value,
      category: this.form.get(['category']).value,
      name: this.form.get(['name']).value,
      floors: this.form.get(['floors']).value,
      createdOn: new Date(this.form.get(['createdOn']).value),
      updatedOn: new Date(this.form.get(['updatedOn']).value),
      address: this.form.get(['address']).value,
      createdBy: this.form.get(['createdBy']).value,
      updatedBy: this.form.get(['updatedBy']).value,
    };
  }

  compareAddress(first: Address, second: Address): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackAddressById(index: number, item: Address) {
    return item.id;
  }
  compareUser(first: User, second: User): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackUserById(index: number, item: User) {
    return item.id;
  }
}
