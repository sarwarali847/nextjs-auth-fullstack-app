
export default function UserProfile({params}:any){
    return (
        <div className="bg-black flex flex-xol items-center
        justify-center min-h-screen py-2">
            <p className="text-2xl text-white">User Profile</p>
            <span className="p-2 ml-2 rounded bg-orange-500 text-black text-2xl">{params.id}</span>
        </div>

    );
}