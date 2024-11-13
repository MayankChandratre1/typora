const MagnifyingGlass = ({ size, color}:{
    size: "large" | "small",
    color?: string,
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} className={`${size==="large" ? `size-10`:`size-6`}  dark:stroke-white stroke-black`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>


    )
}

export default MagnifyingGlass