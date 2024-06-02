import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { PiChefHatBold } from "react-icons/pi";
import { FaVanShuttle } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, } from 'recharts';
import { PieChart, Pie, Sector } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


const AdminHome = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data: stats = []} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats')
            return res.data;
        }
    })

    const {data: chartData = []} = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/order-stats')
            console.log(res.data)
            return res.data;
        }
    })

    // custom shape for the barChart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

    // pieChart
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

    const pieChart = chartData.map(item => {
        return {
            name: item.category,
            value: item.revenue
        }
    })


    return (
        <section className="container mx-auto px-4 my-10">
            <h2 className="font-Cinzel text-2xl font-semibold text-[#151515] uppercase">Hi, Welcome <span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
                </span>
            </h2>
            <div className="grid lg:grid-cols-4 col-span-1 justify-center items-center mt-5 gap-5">
                <div className="flex justify-center items-center gap-5 py-10 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] col-span-1 rounded-xl">
                     <span className="text-6xl text-white"><MdAccountBalanceWallet /></span>
                     <div className="space-y-1">
                        <h3 className="text-4xl font-extrabold uppercase text-white">{stats.revenue}</h3>
                        <p className="text-xl text-white">Revenue</p>
                     </div>
                </div>
                <div className="flex justify-center items-center gap-5 py-10 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] col-span-1 rounded-xl">
                     <span className="text-6xl text-white"><FaUsers /></span>
                     <div className="space-y-1">
                        <h3 className="text-4xl font-extrabold text-white uppercase">{stats.usersCount}</h3>
                        <p className="text-xl text-white">Customers</p>
                     </div>
                </div>
                <div className="flex justify-center items-center gap-5 py-10 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] col-span-1 rounded-xl">
                     <span className="text-6xl text-white"><PiChefHatBold /></span>
                     <div className="space-y-1">
                        <h3 className="text-4xl font-extrabold text-white uppercase">{stats.menuCont}</h3>
                        <p className="text-xl text-white">Menu Items</p>
                     </div>
                </div>
                <div className="flex justify-center items-center gap-5 py-10 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] col-span-1 rounded-xl">
                     <span className="text-6xl text-white"><FaVanShuttle /></span>
                     <div className="space-y-1">
                        <h3 className="text-4xl font-extrabold text-white uppercase">{stats.ordersCount}</h3>
                        <p className="text-xl text-white">Orders</p>
                     </div>
                </div>
            </div>
            <div className="grid grid-cols-2 justify-center items-center">
            <div className="col-span-1">
                <BarChart className="w-full"
      width={600}
      height={400}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Legend/>
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
    </BarChart>
            </div>
            <div className="col-span-1">
        <PieChart width={500} height={400}>
            <Legend/>
          <Pie
            data={pieChart}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            <Sector/>
            {pieChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>

            </div>
            </div>
        </section>
    );
};

export default AdminHome;