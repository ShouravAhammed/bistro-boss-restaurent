import useAuth from "../../../hooks/useAuth";

const UserHome = () => {

    const {user} = useAuth();

    return (
        <section className="container mx-auto px-4 my-10">
            <h2 className="font-Cinzel text-2xl font-semibold text-[#151515] uppercase">Hi, Welcome <span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
                </span>
            </h2>
        </section>
    );
};

export default UserHome;