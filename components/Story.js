const Story = ({img,username}) => {
    return (
        <div>
            <img className={'h-14 w-14 rounded-full p-[1.5px] hover:scale-110 transition transform ease-out cursor-pointer border-2 border-red-500 object-contain'} src={img} alt=""/>
            <p className={'text-xs w-14 truncate text-center'}>{username}</p>
        </div>
    );
};

export default Story;