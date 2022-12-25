import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from './address.model';
import { AddressService } from './address.service';

@Component({
  selector: 'page-address-update',
  templateUrl: 'address-update.html',
})
export class AddressUpdatePage implements OnInit {
  address: Address;
  createdOn: string;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [null, []],
    street: [null, []],
    area: [null, []],
    city: [null, []],
    state: [null, []],
    country: [null, []],
    postalCode: [null, []],
    location: [null, []],
    createdOn: [null, []],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: UntypedFormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private addressService: AddressService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(response => {
      this.address = response.data;
      this.isNew = this.address.id === null || this.address.id === undefined;
      this.updateForm(this.address);
    });
  }

  updateForm(address: Address) {
    this.form.patchValue({
      id: address.id,
      street: address.street,
      area: address.area,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      location: address.location,
      createdOn: this.isNew ? new Date().toISOString() : address.createdOn,
    });
  }

  save() {
    this.isSaving = true;
    const address = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Address>>) {
    result.subscribe(
      (res: HttpResponse<Address>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Address ${action} successfully.`, duration: 2000, position: 'middle' });
    await toast.present();
    await this.navController.navigateBack('/tabs/entities/address');
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

  private createFromForm(): Address {
    return {
      ...new Address(),
      id: this.form.get(['id']).value,
      street: this.form.get(['street']).value,
      area: this.form.get(['area']).value,
      city: this.form.get(['city']).value,
      state: this.form.get(['state']).value,
      country: this.form.get(['country']).value,
      postalCode: this.form.get(['postalCode']).value,
      location: this.form.get(['location']).value,
      createdOn: new Date(this.form.get(['createdOn']).value),
    };
  }
}
