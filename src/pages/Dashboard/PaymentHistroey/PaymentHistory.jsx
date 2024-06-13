import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {

    const {user} = useAuth();

    const {data: payments = []} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })


    return (
        <section className="my-10">
            <div>
                <SectionTitle subHeading={"---Your payment history---"} heading={"Payment History"}></SectionTitle>
            </div>

            <div className="bg-white lg:p-10 md:p-5 lg:m-5 p-2 m-2">
                <div className="flex justify-between items-center">
                    <h3 className="md:text-2xl text-base font-Cinzel text-[#151515] font-bold">Total Orders: {payments.length}</h3>
                </div>
                <div className="overflow-x-auto">
  <table className="table mt-5 ">
    {/* head */}
    <thead>
      <tr className="bg-[#D1A054] text-base text-white uppercase rounded-t-xl">
        <th></th>
        <th>Email</th>
        <th>Category</th>
        <th>Total Payments</th>
        <th>Payment Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        payments.map((payment, index) => <tr key={payment._id} className="text-base font-normal text-[#737373]">
            <th>
          <p className="text-[#151515] font-bold">{index + 1}</p>
        </th>
        <td>
          <p>{payment.email}</p>
        </td>
        <td>
          {payment.transactionId}
        </td>
        <td>${payment.price}</td>
        <th>
          <p>{payment.date}</p>
        </th>
        </tr>)
      }
    </tbody>
  </table>
</div>
            </div>

        </section>
    );
};

export default PaymentHistory;