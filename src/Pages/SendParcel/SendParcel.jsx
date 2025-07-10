
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useLoaderData, useNavigate } from 'react-router';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { v4 as uuidv4 } from 'uuid';
import SubmitModal from '../../Component/Modal/SubmitModal';
import { AuthContext } from '../Context/AuthContext';

const SendParcel = () => {
      const regionsData = useLoaderData(); 
      const axiosSecure=UseAxiosSecure()
      const {user}=useContext(AuthContext)
const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors }, setValue,reset  } = useForm();

  const [cost, setCost] = useState(null);
  const [senderCenters, setSenderCenters] = useState([]);
  const [receiverCenters, setReceiverCenters] = useState([]);
  const [breakdownText, setBreakdownText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
const [parcelData, setParcelData] = useState(null);
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

const calculateCost = (type, serviceCenter, weight) => {
    let cost = 0;
    let breakdown = "";

    if (type === 'document') {
      cost = serviceCenter === 'Dhaka' ? 60 : 80;
      breakdown = `Type: Document\nLocation: ${serviceCenter === 'Dhaka' ? "Within City" : "Outside City"}\nTotal: ৳${cost}`;
    } else {
      const weightNum = parseFloat(weight) || 0;
      if (weightNum <= 3) {
        cost = serviceCenter === 'Dhaka' ? 110 : 150;
        breakdown = `Type: Non-Document\nWeight: Up to 3kg\nLocation: ${serviceCenter === 'Dhaka' ? "Within City" : "Outside City"}\nTotal: ৳${cost}`;
      } else {
        const extraKg = weightNum - 3;
        const extraCharge = extraKg * 40;
        cost = serviceCenter === 'Dhaka' ? (110 + extraCharge) : (150 + extraCharge + 40);
        breakdown = `Type: Non-Document\nWeight: ${weightNum}kg\nLocation: ${serviceCenter === 'Dhaka' ? "Within City" : "Outside City"}\nExtra: ৳${extraCharge}${serviceCenter !== 'Dhaka' ? " + ৳40" : ""}\nTotal: ৳${cost}`;
      }
    }

    return { cost, breakdown };
  };

  const onSubmit = (data) => {
    const { cost, breakdown } = calculateCost(data.type, data.receiverServiceCenter, data.weight);
    setCost(cost);
    setBreakdownText(breakdown);
    setParcelData(data);
    setModalOpen(true);
  };
const handleConfirm = async () => {
  if (!parcelData) {
    toast.error("❌ No parcel data found!");
    return;
  }

  const trackingId = uuidv4().slice(0, 10).toUpperCase();

  const finalData = {
    ...parcelData,
    trackingId,
      email: user?.email,
    creation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  };

  try {
    const res = await axiosSecure.post('/parcels', finalData);
   if (res.data?.insertedId) {
  toast.success(`✅ Parcel saved! Tracking ID: ${trackingId}`);
  setModalOpen(false);
  reset();
  navigate('/'); 
}

  } catch (err) {
    toast.error("❌ Failed to save parcel");
    console.error(err);
  }
};





  
 

  const handleSenderRegionChange = (e) => {
    const selected = e.target.value;
    const centers = regionsData.filter(r => r.region === selected).map(r => r.city);
    setSenderCenters(centers);
    setValue("senderServiceCenter", "");
  };

  const handleReceiverRegionChange = (e) => {
    const selected = e.target.value;
    const centers = regionsData.filter(r => r.region === selected).map(r => r.city);
    setReceiverCenters(centers);
    setValue("receiverServiceCenter", "");
  };

  const uniqueRegions = [...new Set(regionsData.map(item => item.region))];

    return (
       <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-1 text-center">Door to Door Parcel Form</h2>
      <p className="text-center text-gray-500 mb-6">Fill the details below to calculate delivery cost</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div className="grid grid-cols-1  gap-4">
          <div>
            <label className="label">Title</label>
            <input type="text" {...register("title", { required: true })} className="input input-bordered w-full" />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>
    
          <div>
           
            <label className="label">Type</label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                <input type="radio" value="document" {...register("type", { required: true })} /> Document
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="non-document" {...register("type", { required: true })} /> Non-document
              </label>
            </div>
            {errors.type && <span className="text-red-500 text-sm">Type is required</span>}
          </div>
          {parcelType === 'non-document' && (
            <div>
              <label className="label">Weight (kg)</label>
              <input type="number" {...register("weight")} className="input input-bordered w-full" />
            </div>
          )}
        </div>

        {/* Sender & Receiver */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sender Info</h3>
            <input {...register("senderName", { required: true })} placeholder="Sender Name" className="input input-bordered w-full" />
            <input {...register("senderContact", { required: true })} placeholder="Sender Contact" className="input input-bordered w-full" />
            <select {...register("senderRegion", { required: true })} onChange={handleSenderRegionChange} className="select select-bordered w-full">
              <option value="">Select Region</option>
              {uniqueRegions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
            <select {...register("senderServiceCenter", { required: true })} className="select select-bordered w-full">
              <option value="">Select Service Center</option>
              {senderCenters.map((city, i) => <option key={i} value={city}>{city}</option>)}
            </select>
            <input {...register("pickupAddress", { required: true })} placeholder="Pickup Address" className="input input-bordered w-full" />
            <textarea {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full"></textarea>
          </div>

          {/* Receiver Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Receiver Info</h3>
            <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
            <input {...register("receiverContact", { required: true })} placeholder="Receiver Contact" className="input input-bordered w-full" />
            <select {...register("receiverRegion", { required: true })} onChange={handleReceiverRegionChange} className="select select-bordered w-full">
              <option value="">Select Region</option>
              {uniqueRegions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
            <select {...register("receiverServiceCenter", { required: true })} className="select select-bordered w-full">
              <option value="">Select Service Center</option>
              {receiverCenters.map((city, i) => <option key={i} value={city}>{city}</option>)}
            </select>
            <input {...register("deliveryAddress", { required: true })} placeholder="Delivery Address" className="input input-bordered w-full" />
            <textarea {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full"></textarea>
          </div>
        </div>

        <div className="text-center text-black mt-6">
          <button type="submit" className="btn btn-primary"> Submit</button>
        </div>

  

      </form>
      <SubmitModal
  visible={modalOpen}
  cost={cost}
  breakdown={breakdownText}
  onConfirm={handleConfirm}
  onClose={() => {
    setModalOpen(false);
  toast.error("❌ Parcel submission cancelled");

  }}
/>

    


   
     
      
    </div>
    );
};

export default SendParcel;