'use client';

import * as React from 'react';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function QRScanner({ url }: { url:string}) {
  const [data, setData] = useState<string>('No result');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const handleResult = (result: any, error: any) => {
    if (result) {
      setData(result?.getText ? result.getText() : 'Invalid QR Code');
    }
    if (error) {
      console.info(error);
    }
  };
  
  if (data === process.env.NEXT_PUBLIC_QR_CODE) {
    redirect(`/qr-verification/${url}`);
  }
    const toggleCamera = () => {
      setFacingMode((prevMode) => (prevMode === 'environment' ? 'user' : 'environment'));
    };


  return (
    <div className="-mt-20 h-screen flex flex-col items-center justify-center">
      <Image width={500} height={500} src="/assets/floraltop.png" alt="" className="w-3/4 mx-auto mb-20" />

      <div className=" w-full flex items-center justify-center bg-black border  -mt-20  rounded-xl">
        {/* QR Scanner with full screen */}
        <div className="relative w-full max-w-md aspect-square">
          <QrReader onResult={handleResult} constraints={{ facingMode: facingMode }} className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Overlay with scanning frame */}
        <div className="absolute flex flex-col items-center justify-center -mt-7">
          <div className="relative w-44 h-44 md:w-64 md:h-64">
            {/* Scanning frame */}
            <div className="absolute inset-0 border-2 border-white/50 rounded-xl">
              {/* Corner markers */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-white"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-white"></div>
            </div>

            {/* Instruction text */}
            <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/90 text-center whitespace-nowrap text-xs">Sejajarkan kode QR di dalam bingkai</p>
          </div>
        </div>

        {/* Camera switch button */}
        {/* <Button onClick={toggleCamera} className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border border-white/20" variant="ghost" size="icon">
        <CameraIcon className="h-5 w-5" />
      </Button> */}

        {/* Result overlay (only shown when there's a result) */}
        {/* {data !== 'No result' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 text-white">
            <p className="text-center break-all">{data}</p>
          </div>
        )} */}
      </div>

      <Image width={500} height={500} src="/assets/floralbottom.png" alt="" className="w-3/4 mx-auto mt-8" />
    </div>
  );
}
