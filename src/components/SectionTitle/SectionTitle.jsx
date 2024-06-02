

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="lg:w-4/12 md:w-5/12 w-full mx-auto text-center">
            <h3 className="text-base font-semibold text-[#D99904] mb-4">{subHeading}</h3>
            <p className="text-3xl font-normal border-y-4 p-3 uppercase">{heading}</p>
        </div>
    );
};

export default SectionTitle;