import Image from "next/image";
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon, HomeIcon
}
    from '@heroicons/react/outline'
import {signOut,signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {modalState} from "../atoms/modalAtom";

const Header = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState)

    return (
        <div className={'shadow-lg border-b bg-white sticky top-0 z-50'}>
            <div className={'flex justify-between bg-white max-w-6xl mx-5 xl:mx-auto'}>
                <div onClick={()=>{router.push('/')}} className={'relative w-24 hidden lg:inline-grid cursor-pointer'}>
                    <Image
                        src={'https://links.papareact.com/ocw'}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </div>
                <div onClick={()=>{router.push('/')}} className={'relative w-10 lg:hidden flex-shrink-0 cursor-pointer'}>
                    <Image
                        src={'https://links.papareact.com/jjm'}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </div>
                <div className={'max-w-xs'}>
                    <div className={'mt-1 relative p-3 rounded-md bg'}>
                        <div className={'absolute inset-y-0 pl-3 flex items-center pointer-events-none'}>
                            <SearchIcon className={'h-5 text-gray-400'} />
                        </div>
                        <input className={'bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:border-black'} type="text" placeholder={'Search'} />
                    </div>
                </div>

                <div className={'flex items-center justify-end space-x-4'}>
                    <HomeIcon onClick={()=>{router.push('/')}} className={'navBtn'} />
                    <MenuIcon className={'w-10 md:hidden cursor-pointer'} />
                    {session?(
                        <>
                            <div className={'relative navBtn'}>
                                <PaperAirplaneIcon className={'navBtn rotate-45'} />
                                <div className={'absolute text-sm w-5 h-5 -top-1 bg-red-500 rounded-full flex items-center justify-center -right-2 animate-pulse text-white'}>
                                    3
                                </div>
                            </div>
                            <PlusCircleIcon onClick={()=>setOpen(true)} className={'navBtn'} />
                            <UserGroupIcon className={'navBtn'} />
                            <HeartIcon className={'navBtn'} />

                            <img loading={'lazy'} onClick={signOut} className={'h-10 rounded-full cursor-pointer'} src={session?.user?.image} alt=""/>
                        </>
                    ):(
                        <button onClick={signIn}>
                            Sign in
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Header;