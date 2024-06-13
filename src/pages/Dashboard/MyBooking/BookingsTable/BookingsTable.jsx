

const BookingsTable = ({item}) => {
    console.log(item.adjustedCart);
    const booking = item.adjustedCart
    const bookingLength = booking.length
    console.log(bookingLength);
    
    return (
        <tbody>
      {
        booking.map((item, index) => <tr key={item._id} className="text-base font-normal text-[#737373]">
            <th>
          <p className="text-[#151515] font-bold">{index + 1}</p>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-16 h-16">
                <img src={item.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
          {item.name}
        </td>
        <td>Person {item.personQuantity}</td>
        <td>${item.price}</td>
        <td>${item.totalPrice}</td>
        <th>
        </th>
        </tr>
        )
    }
    </tbody>
);
};

export default BookingsTable;