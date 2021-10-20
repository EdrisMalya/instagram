import {useEffect, useState} from "react";
import faker from 'faker';
import Story from "./Story";
import {useSession} from "next-auth/react";

const Stories = () => {

    const [suggestions, setSuggestions] = useState([]);
    const {data: session} = useSession();

    useEffect(()=>{
        const suggestions = [...Array(20)].map((_,i)=>({
            ...faker.helpers.contextualCard(),
            id: i
        }));
        setSuggestions(suggestions);
    },[]);
    return (
        <div className={'flex space-x-2 p-6 bg-white mt-8 border rounded-sm overflow-x-auto max-w-screen-2xl scrollbar-thin scrollbar-thumb-black'}>
            {
                session&&(
                    <Story
                        key={'testing'}
                        img={session?.user?.image}
                        username={session?.user?.username}
                    />
                )
            }
            {suggestions.map(profile=>(
                <Story
                    key={profile.id}
                    img={profile.avatar}
                    username={profile.username}
                />
            ))}
        </div>
    );
};

export default Stories;