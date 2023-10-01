const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const rooms = [];
const bookings = [];

app.use(bodyParser.json());

app.post("/create_room", (req, res) => {
  const data = req.body;
  const room = {
    room_id: rooms.length + 1,
    room_name: data.room_name,
    seats_available: data.seats_available,
    amenities: data.amenities,
    price_per_hour: data.price_per_hour,
  };
  rooms.push(room);
  res.status(201).json({ message: "Room created successfully" });
});

app.post("/book_room", (req, res) => {
  const data = req.body;
  const booking = {
    booking_id: bookings.length + 1,
    customer_name: data.customer_name,
    date: data.date,
    start_time: data.start_time,
    end_time: data.end_time,
    room_id: data.room_id,
  };
  bookings.push(booking);
  res.status(201).json({ message: "Room booked successfully" });
});

app.get("/list_rooms_with_bookings", (req, res) => {
  const result = rooms.map((room) => {
    const booking = bookings.find(
      (booking) => booking.room_id === room.room_id
    );
    return {
      room_name: room.room_name,
      booked_status: !!booking,
      booking_info: booking || {},
    };
  });
  res.json(result);
});

app.get("/list_customers_with_bookings", (req, res) => {
  const result = bookings.map((booking) => {
    const room = rooms.find((room) => room.room_id === booking.room_id);
    return {
      customer_name: booking.customer_name,
      room_name: room.room_name,
      date: booking.date,
      start_time: booking.start_time,
      end_time: booking.end_time,
    };
  });
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
