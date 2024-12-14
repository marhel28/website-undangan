'use client';

import { useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';

type ButtonProps = {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
};

export default function ButtonForm({ type = 'button', label, onClick, disabled, className }: ButtonProps) {
  const { pending } = useFormStatus();

  const typeBtn = type ? type : 'button';
  const classBtn = pending || disabled ? ' cursor-not-allowed opacity-80' : ' cursor-pointer';

  // Define motion variants for animation
  const variantsAnimate = {
    initial: { scale: 1 },
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      variants={variantsAnimate}
      type={typeBtn}
      onClick={onClick}
      className={` text-center  text-base w-full px-12 pt-2.5 pb-3 flex flex-row justify-center  items-center  rounded-lg bg-[--primary-color] text-gray-50 ${classBtn} transition ease-in-out duration-150 ${className}`}
      disabled={pending || disabled}
    >
      {!!pending && (
        <svg className="animate-spin mr-2 w-5 h-5  fill-white" viewBox="3 3 18 18">
          <path
            className="opacity-20"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
        </svg>
      )}
      <span>{label}</span>
    </motion.button>
  );
}
