'use client'

import { updateWedding } from '@/actions/wedding.action';
import ButtonForm from '@/components/Form/ButtonForm';
import InputForm from '@/components/Form/InputForm';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { Wedding } from '@prisma/client';
import Signout from '../elements/Signout';

export default function FormSettings({ wedding }: { wedding: Wedding }) {
  // const { users, error } = await getUsers();
  // update setting
  const [errorMessage, formAction] = useFormState(updateWedding, undefined);

  useEffect(() => {
    // jika berhasil berikan notif
    if (errorMessage && 'success' in errorMessage && errorMessage.success === true) {
      toast('Data berhasil diperbarui.', {
        icon: '✔️',
      });
    }
  }, [errorMessage, toast]);

  const [formData, setFormData] = useState({
    groomName: wedding.groomName,
    groomMotherName: wedding.groomMotherName,
    groomFatherName: wedding.groomFatherName,
    groomAddress: wedding.groomAddress,
    brideName: wedding.brideName,
    brideMotherName: wedding.brideMotherName,
    brideFatherName: wedding.brideFatherName,
    brideAddress: wedding.brideAddress,
    akadTime: wedding.akadTime,
    akadLocation: wedding.akadLocation,
    akadGoogleMapLink: wedding.akadGoogleMapLink,
    resepsiTime: wedding.resepsiTime,
    resepsiLocation: wedding.resepsiLocation,
    resepsiGoogleMapLink: wedding.resepsiGoogleMapLink,
  });
  const handleInputChange = (value: any, id: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <form action={formAction}>
      <div className="text-left !mt-2 grid grid-cols-12 gap-4 ">
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.groomName} onChange={(value) => handleInputChange(value, 'groomName')} id="groomName" label="Nama mempelai (Pria)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.groomMotherName} onChange={(value) => handleInputChange(value, 'groomMotherName')} id="groomMotherName" label="Nama Ibu mempelai (Pria)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.groomFatherName} onChange={(value) => handleInputChange(value, 'groomFatherName')} id="groomFatherName" label="Nama Bapak mempelai (Pria)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.groomAddress} onChange={(value) => handleInputChange(value, 'groomAddress')} id="groomAddress" label="Alamat mempelai (Pria)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.brideName} onChange={(value) => handleInputChange(value, 'brideName')} id="brideName" label="Nama mempelai (Wanita)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.brideMotherName} onChange={(value) => handleInputChange(value, 'brideMotherName')} id="brideMotherName" label="Nama Ibu mempelai (Wanita)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.brideFatherName} onChange={(value) => handleInputChange(value, 'brideFatherName')} id="brideFatherName" label="Nama Bapak mempelai (Wanita)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.brideAddress} onChange={(value) => handleInputChange(value, 'brideAddress')} id="brideAddress" label="Alamat mempelai (Wanita)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'date'} id="akadDate" label="Tanggal (Akad)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'time'} id="akadTime" label="Jam (Akad)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.akadLocation} onChange={(value) => handleInputChange(value, 'akadLocation')} id="akadLocation" label="Alamat (Akad)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.akadGoogleMapLink} onChange={(value) => handleInputChange(value, 'akadGoogleMapLink')} id="akadGoogleMapLink" label="Link Google Map (Akad)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'date'} id="resepsiDate" label="Tanggal (Resepsi)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'time'} id="resepsiTime" label="Jam (Resepsi)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.resepsiLocation} onChange={(value) => handleInputChange(value, 'resepsiLocation')} id="resepsiLocation" label="Alamat (Resepsi)" />
        </div>
        <div className="col-span-full xl:col-span-12">
          <InputForm errors={errorMessage} type={'text'} value={formData.resepsiGoogleMapLink} onChange={(value) => handleInputChange(value, 'resepsiGoogleMapLink')} id="resepsiGoogleMapLink" label="Link Google Map (Resepsi)" />
        </div>
      </div>
      <div className="flex md:flex-row flex-col-reverse items-center !space-y-0 justify-end  md:space-x-4 space-x-0 pt-8">
        <Signout className='mt-4 md:mt-0'/>
        <ButtonForm type="submit" className={`m-0 w-full lg:w-fit lg:!px-5 bg-[var(--primary-color)]`} label={'Simpan'} />
      </div>
    </form>
  );
}