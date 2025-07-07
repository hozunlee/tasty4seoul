"use client";

import { Modal } from '@/shared/ui/Modal';
import { Spinner } from '@/shared/ui/layout/components/Spinner';

export default function Loading() {
  return (
    <Modal isOpen={true}> {/* 항상 열려 있도록 설정 */}
      <div className="flex flex-col items-center justify-center py-8">
        <Spinner show={true} size="large" />
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading blog post...</p>
      </div>
    </Modal>
  );
}
