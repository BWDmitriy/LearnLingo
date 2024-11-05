// src/BookingForm.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const bookingSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  message: yup.string().required("Message is required"),
});

function BookingForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = (data) => {
    console.log("Booking data:", data);
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Date</label>
            <input type="date" {...register("date")} />
            <p>{errors.date?.message}</p>
          </div>
          <div>
            <label>Time</label>
            <input type="time" {...register("time")} />
            <p>{errors.time?.message}</p>
          </div>
          <div>
            <label>Message</label>
            <textarea {...register("message")} />
            <p>{errors.message?.message}</p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
