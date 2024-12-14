'use client'
import { createInvitationGreeting } from "@/actions/invitationGreeting.action";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export default function AddComments({lengthComment, id }: {lengthComment:number, id: number }) {
  const [errorMessage, formAction] = useFormState(createInvitationGreeting, undefined);
  const [greeting, setGreeting] = useState(""); // Track textarea value

  React.useEffect(() => {
    // If submission is successful, show the toast and clear the textarea
    if (errorMessage && 'success' in errorMessage && errorMessage.success === true) {
      toast('Komentar berhasil dikirm.', {
        icon: '✔️',
      });
      setGreeting(''); // Clear the textarea value
    }
  }, [errorMessage, toast]);

  return (
    <form action={formAction} className="px-5 mt-10 space-y-5">
      <input type="text" name="invitationId" hidden value={id} readOnly />
      <div className="w-full bg-[var(--secondary-color)] font-light uppercase py-4 px-5 rounded-lg">{lengthComment} Kartu Ucapan</div>
      <div className="space-y-3">
        <label htmlFor="" className="font-medium text-gray-600">
          Ucapan
        </label>
        <textarea
          required
          name="greeting"
          id=""
          rows={6}
          value={greeting} // Bind the value to state
          onChange={(e) => setGreeting(e.target.value)} // Update state on change
          className="bg-[var(--secondary-color)] py-4 px-5 border-none rounded-xl w-full focus:outline-none"
        />
      </div>
      <button type="submit" className="uppercase mt-4 rounded-full bg-[var(--primary-color)] text-lg font-bold text-white px-8 py-1.5 pb-2 shadow">
        Kirim
      </button>
    </form>
  );
}
