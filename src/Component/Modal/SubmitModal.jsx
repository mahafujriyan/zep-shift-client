import React from 'react';

const SubmitModal = ({ visible, onClose, cost, breakdown, onConfirm }) => {
     if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-center text-green-600">
          Estimated Cost: ৳{cost}
        </h2>

        {breakdown && (
          <div className="bg-gray-100 p-3 rounded mt-4 text-left">
            <h4 className="font-semibold mb-1">💰 Cost Breakdown</h4>
            <p className="whitespace-pre-line text-sm text-gray-700">{breakdown}</p>
          </div>
        )}

        <p className="mt-4 text-black text-center">Confirm and save this parcel?</p>

        <div className="flex justify-center gap-4 mt-6">
          <button onClick={onClose} className="btn btn-error btn-sm">Cancel</button>
          <button onClick={onConfirm} className="btn btn-success btn-sm">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
