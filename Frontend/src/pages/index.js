import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter();

    useEffect(()=>{
        if(!localStorage.getItem('token'))
            router.push('/login')
    },[])

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}
