import icons from "./icons";

const { TbSearch, MdImageSearch, IoHomeOutline, FaRegObjectGroup } = icons

const links = [
    {
        name: 'Home',
        href: '/',
        icon: IoHomeOutline
    },
    {
        name: 'Image Search',
        href: '/image-search',
        icon: MdImageSearch
    },
    {
        name: 'Text Search',
        href: '/text-search',
        icon: TbSearch
    },
    {
        name: 'Object Detection',
        href: '/object-detection',
        icon: FaRegObjectGroup
    }
]

export default links