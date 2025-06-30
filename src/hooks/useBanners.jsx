// Custom hook to fetch banners from the /banners endpoint

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";





const useBanners = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: banners = [] } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosPublic.get('/banners');
            return res.data;
        }
    });

    // Explicitly define slide1, slide2, slide3 from the banners array
    // Assuming each banner object has an 'imageUrl' property
    const slide1 = banners[0]?.imageUrl || '';
    const slide2 = banners[1]?.imageUrl || '';
    const slide3 = banners[2]?.imageUrl || '';

    return [slide1, slide2, slide3, refetch];
};

export default useBanners;