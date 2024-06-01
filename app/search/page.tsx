"use client";

import React from "react";
import ProductCard from "@/components/product-card/product-card";
import { SearchWithIcon } from "@/components/search/search";
import { useSearchStore } from "@/store/searchResults";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard from "@/components/product-card/product-card-skeleton";
import { Loader } from "lucide-react";
import Lottie from 'lottie-react';
import animationData from '@/public/Animation.json'; // Adjust the path if necessary


const SearchPage = () => {
    const results = useSearchStore((state) => state.results);    
    const initialMockData = [
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQiGyQwoxg4zlaqJSaAC9KnYg1EI9lkX-PdWOil-bjTkMcSuytE",
            "link": "https://m.indiamart.com/proddetail/katana-cat-mens-printed-t-shirt-27157726248.html",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRFkXHNBy36azo2uMwRfdFPulhnBaRQBel6hfWpeCZDsF7tBbrK7yfcleCI4Z8e4yvyqxiSsx_bc3ulj1shQ1cxqajCR3A3sXHSvymc_gCiNtmhesY",
            "price": "Rs 250",
            "rating": "4/5",
            "source": "IndiaMART",
            "title": "Katana Cat Mens Printed T Shirt"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQzTVloRi1ESQaHmPMxfUSJFjAYby1lG1LH6GQt6SGA2m5ymWsw",
            "link": "https://in.pinterest.com/pin/experience-aesthetic-and-vaporwave-fashion-with-vapor95s-graphic-tees--194428908904568386/",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcSYpax9-23w3k55h5fvk6iCbcYzKnm1qjhMsJ1P4Bb4O6gI2DZH7bYpZ5seEAXynHj3p4A6cHFAP_wbQ2CvnQYaOUp6ihp29pqECCB1pKH0MRnuasA6",
            "price": "$34.95",
            "rating": "5/5",
            "source": "Pinterest",
            "title": "Feline Shogun Tee - Black / M"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiKlrmBRBYhQLZYJSZLTvBamFYVgPOGKoQaNRlEY_Wj7ok9UG",
            "link": "https://www.grayscaletee.com/product-page/biscuit-sub-334",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcQJaG9NSXdCapaVQULgT_vJQU6n4EN-_bJ1gPGvL_LMD4RCEILiTvYFQxhdUNmb-YgrxDXcnK1dkNCj-7eP8xXz--pN7PFHLF52Xkm2KG4Gc1_O_6ZnkhOPxA",
            "price": "฿290.00",
            "rating": "3/5",
            "source": "grayscaletee.com",
            "title": "Biscuit Sub 334"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRsXmCLnGQLMqK0-2Qm_fd_kxknMOG2YCJgbTKNLwHWSyWU3bnD",
            "link": "https://www.fruugonorge.com/unisex-vintage-anime-cat-printed-t-shirts-short-sleeve-tops-for-adultteens-gifts/p-150411288-317827403?language=en",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcSsNzjD_-2I3M8Fg8qWKLmWDjfAr81j9qY59RAWTXDJhHqJYcMEeLjkVnI5xBBz-2MzMK_aWMyHLgdM7aaym-SdA5SyuR74ibKJmOwJZP2GaNmIaEpQeYTB",
            "price": "NOK169.00+ NOK67.49 Shipping",
            "rating": "5/5",
            "source": "Fruugo NO",
            "title": "Unisex Vintage Anime Cat Printed T-shirts Short Sleeve Tops For Adult/teens Gifts"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ4UjxshaqMce5qBHUZnlOQYle-qdWjBFdL8dFYrDxenu6oj8PF",
            "link": "https://teetall.pk/products/mens-cotton-sticker-printed-t-shirt-ttmps47-black",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcTuGDxFFQyQuKRj6UEcxCicp9tVCDM2BkWe5rGH34uzKeHIBc8BL4IsE8alH_eKr-G9_VYNRf9ezlp47fI3oqYn1BvISBxhTafkFlLPOjC2",
            "price": "Rs.949",
            "rating": "4/5",
            "source": "Tee Tall adsdasdasdasdasdedsadwedwdawdwadwad",
            "title": "Mens Cotton Sticker Printed T-Shirt TTMPS47 - Black"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQSc-Hut11Ld7Q9d8VMe-IwZSU2_xG9pm1JpZdVf1xhD6JC3RIg",
            "link": "https://aynstore.com/product/cartoon-anime-samurai-cat-printed-t-shirt/",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQnKJyqWlbDKYzIJpALLAq-gFMNlTvz1__f2IDOfptcrDzUOwwTru3Q6jSHiP8E4Xok3lhZie4akXRnQ77w82vdK8E1kztOG1-VreMYIltqlHo",
            "price": "$10.00",
            "rating": "4/5",
            "source": "aynstore.com",
            "title": "Cartoon Anime Samurai Cat Printed T Shirt"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-hBXvwKVZOOlSOHOxe3gnfWEeRH3iIO7n2u2TmdE9qO5oSCtO",
            "link": "https://vi3256805822252603.zaguriey.pl/",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcQ_RKhYSBCgqcd9mfdqr1yN7di7xga9DCN75NexgpgaqzlzbIKgBWD2rHTJL-qcreZz8oqkJLRew3erJ_uj5fHgec5tIaMVFXqkJkf4OtHh-EaFey0orYZZY69DkwnkO3rauJE",
            "price": "$11.64",
            "rating": "5/5",
            "source": "zaguriey.pl",
            "title": "Japanese Style Cat Anime Samurai Sword Catana Cat Streetwear Men Washed Vintage T-Shirt Tshirt Cotton Street Men's Tops Tees 2XL"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTahZfpULtidIIdk7Dj8fSIZKMsHRyE9FIjEu4NRtmK1_rx21Qb",
            "link": "https://www.ebay.com.my/itm/334955678361?hash=item4dfcea0a99:g:33kAAOSw40tkt5bF&var=544177754074",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcTJ2jV7jNGHlQepIax-mL_oMAdhV1hbmmRIhNj1Yg3ZVUoAG5VboA48ZJ4gcwVXSk3D9ug9suTpZsU44I9MCZy3hdnRwhNw06FpYTez9qSVnqXRoBo",
            "price": "AU $34.00",
            "rating": "4/5",
            "source": "eBay",
            "title": "Kids/MEN/WOMEN Cartoon Cool Tattoo Japanese Yakuza with Knife Fighting T-Shirt"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRiT_snjlM2Pzy1sY-2-I1BDEb3xLk2CF3M9xsjLoKgH79WfCsu",
            "link": "https://www.spreadshirt.com/shop/design/cat+catana+funny+by+vincent+trinidad+art+shirt+mens+t-shirt-D5eeca514f93764589dacd7cf?sellable=5aoglGEq2Lu3gNyld3Xo-210-7",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcS7QH8CECTr1lAa4UPE9AWUwuEonK4BdQPsUTz4Etz_NpLcnXryWxaIdKo8f3vc_atVDZfuNYTvvpZNlKMzR7iAWP_2radipVbdBzem4TaSvr8zaMCpOBAC",
            "price": "$19.99",
            "rating": "4/5",
            "source": "Spreadshirt",
            "title": "Cat catana funny by Vincent Trinidad Art shirt Men's T-Shirt"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHLYk6XJ-P3_XYWiiQEwNSVlRWxuthRRwBFmiSBqv9XR-Bs8Kb",
            "link": "https://allhailkitty.com/en-gb/products/samurai-cat-ukiyo-e-t-shirt",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcRlS5zvgiI4eOYS_twRHWpSIg9RNbRLbufCUe7813leC8gffTGuzzuT78-BSGUn8HZpK-J2vJJJbNXe0CS2JJvf21ou5wPtqj6M4UI_OrxxEmevoRqB",
            "price": "£24.00 GBP",
            "rating": "3/5",
            "source": "All Hail Kitty",
            "title": "Samurai Cat Ukiyo-e T-Shirt"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtTGdilHXLgngbq7ms82GeFcF083TasjZKCabYv_RoNVnff1m",
            "link": "https://inkinaction.com/product/japan-yakuza-cat-tokyo-fashion-style/",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcSEelQKITSic_Mp3V5zmGFV3CQLNCf0lV3uKy1LYE9KK0f9xpybDGbe5WXa5J8cOsQEJtuClLMd4_gFIM0WEE6KkPzM9sEZiddEnJq4T9NCA0jtwyU",
            "price": "$19.99",
            "rating": "5/5",
            "source": "Ink In Action",
            "title": "Japan Yakuza Cat Tokyo Fashion Style T-Shirt"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ4iUgYJjx8q757uCkrVEV9yuvGTUb-M8wrLei1BYgiUr15tTuA",
            "link": "https://www.threadless.com/shop/%40threadless/design/catana/mens/t-shirt/regular?bvstate=pg:2/ct:r",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcQ9HwzW3UWQJT7xC_wdeQ-liKjGuQS02ugktY6wf4gz29_pHeE_da0tuU5Ov-L3ND7C8T3PK6nahggPheXqiCru5fS3_mGbgWZYeDf2JwrHXLUHoWagu-A",
            "price": "$22.95",
            "rating": "5/5",
            "source": "Threadless",
            "title": "Catana Men's T-Shirt Regular"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTja2vhB3RsWIOrP5HHC9DEoWDJlvB5TgpeY6ObuT3SvR7TLsa1",
            "link": "https://threadcurry.com/products/catana-graphic-printed-oversized-tshirt",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQh9E7_hK8Ko9-zClRMIJC3D_bz8aeRYAL49ivt6y_gmWRkHy58-aH6_OYv80PnvwOlkb8oD-GINBiWWHW-jWObE6if-ccvOANZsQ-oafSEIEAPUno",
            "price": "Rs.1,499 Rs.999",
            "rating": "3/5",
            "source": "threadcurry",
            "title": "Catana Tshirt"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeBhoIwTkViwW-l-UXFGO1txcYH7fRg5lfQSa4T-ynU49kLMQs",
            "link": "https://www.ebay.com/itm/386981382061?chn=ps&mkevt=1&mkcid=28",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcT5NXsW5qpQoNKtvnEC0sNL88H54opWmBBYIh2gQ3U_SGUU-yc8xV_BfeECVq4HYfwroQsx3k4lpMvjDByZM4KvONyK63j7aI6RPQrDFwRa9lo",
            "price": "$9.99",
            "rating": "3/5",
            "source": "eBay",
            "title": "New Fashion Men’s Samurai Cat T Shirt Asian Inspired Black XL"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTOfHxdJ7wtMQIUgLmMULs2eKYJBvp0vDrL0p8fNBiP5WUDBOTZ",
            "link": "https://www.redbubble.com/i/t-shirt/Katana-cat-vintage-by-NihonJinDesu/93694270.UGYPM",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRCAtmliek36Hrv8AAFeZIgkEoa8OCIVLUnMryiexJzpgNBxoCsvDF5CGtl_lEBN8unV-vClsufIguBCd8xv_Y11KEmGunvRbIgpA6ok37w1DxJSZnTrw",
            "price": "$19.54",
            "rating": "4/5",
            "source": "Redbubble",
            "title": "Katana cat vintage Active T-Shirt"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSyuK1FOV8q8NU2OlatbcQZWG15xH1ogEEiWvwaghDMHaMRId6y",
            "link": "https://www.myntra.com/tshirts/threadcurry/threadcurry-girls-printed-round-neck-short-sleeves-regular-fit-t-shirt/27319788/buy",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcSrR7Ml_19H_B-zDu_Z_bQZGw0QqQ9U4wrcsyIsLYTUdUbRnR8dQRl2hFbwwMTnrsx4dn8RSieDAX0xgOMr90CKQT2BqGauj6jT9xLf-SQOorNViw",
            "price": "₹799.00*",
            "rating": "NA",
            "source": "Myntra",
            "title": "THREADCURRY Girls Printed Round Neck Short Sleeves Regular Fit T-shirt (14-15Y) by Myntra"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1ENXeVb-iI3q78lGkvloTave2gI1jzCX2j8wXqv6PIP8pWRbV",
            "link": "https://m.indiamart.com/vikas-saree-kendra/",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRFkXHNBy36azo2uMwRfdFPulhnBaRQBel6hfWpeCZDsF7tBbrK7yfcleCI4Z8e4yvyqxiSsx_bc3ulj1shQ1cxqajCR3A3sXHSvymc_gCiNtmhesY",
            "price": "NA",
            "rating": "NA",
            "source": "IndiaMART",
            "title": "Vikas Saree Kendra, Karvi - Cotton T Shirts and Mens T Shirt"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcrfH0wbzDZnsJAGq0a3Pqo6iaORvg4efcQDz0xn0ODW9w9zlp",
            "link": "https://www.instagram.com/botnia.in/",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcSpoKX-MM8KwYvjLm-JRx4G0Kwl8RLkE48NjkNQo2Gq3SC32GSp-nb0Bv1Gwdg0bIZuT7qIQcsQnlAbeKhfDsUARVp1OzzHay_AKGuFGTR9Of3S2pacaw",
            "price": "NA",
            "rating": "NA",
            "source": "Instagram",
            "title": "Botnia® (@botnia.in) • Instagram photos and videos"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQHefHwD6FmoW0FhUZL8CA3-DkGwrTuGaB7SLOjrzFqnv9XSseo",
            "link": "https://s.click.aliexpress.com/deep_link.htm?aff_short_key=UneMJZVf&dl_target_url=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005003109873588.html%3F_randl_currency%3DILS%26_randl_shipto%3DIL%26src%3Dgoogle",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRi1yREW8HmBeYTRXtsP0KH2bIFXcbDlVLEPCNM46IDGJZtdngQVzL5CeVvkrid7dZ_T6dOzK89j3VieC1AR5zsaKzKOkKVv6DBAPygXKHf7-BWj1Zf1qPjyvoB",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Men Catana Cool Summer Loose Men Women T Shirt Casual Short Sleeve Cat Print Anime Tshirt Japanese Summer T-Shirt Tops Tee Shirt - AliExpress"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTT_i4Q03B0s6rxIwv2_zaM1ZD7v4QLCrj9m3zbKkPyWm1gZtxP",
            "link": "https://www.pinterest.com/pin/--1083115779115695387/",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcTQdhYKRbbqgCC_hUKbg1LBwalc5hFvDef04aKtEm4ymk1UmePKJrPlt_LjHvB7Aq1dYoIBbiIJ1NlsjKc5XTus20V-QeQkUPl9ea4gZzUE1nhIYNB2UA",
            "price": "NA",
            "rating": "NA",
            "source": "Pinterest",
            "title": "Pin by Bavly Sameh on Pins by you | Rick and morty, 3d t shirts, Mens tshirts"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQfz2127go5moqpu4_t1UkexgHZ2teRciu_r3vbuY121qm1VMpF",
            "link": "https://prajna4me.org/shou.asp?iid=349859211-camisetas+gatos+hombre&cid=88",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcSmOIQWYKlYQmDlrKokylwQ70O4uQCyN2t6uPQXcknaeC-Vb-EfgdurKRstPtSuKzQ6g4JMGxmKNXCNj-tDNyYYjzeh4mgS92A5YXWGuZs-8iRo",
            "price": "NA",
            "rating": "NA",
            "source": "Prajna4Me.org",
            "title": "Prajna | JIVA |"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRVfaqI6vMho0I_nzr8C_j85t8m7WB_y0qw8fVIcIRiBUf3neXN",
            "link": "https://www.aoklok.com/products/japanese-samurai-cat-t-shirt",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcRPlEwCIwZCWEZjJp1wAd6PTPVqZR5ERLtFzCPaoYuXp52e82QPBlYR2QDUcKOmELO1S6CmLCIhjCFpnKJ1dL1UnrXA3Oqb_Et3n5RmFogZEsVSHQ",
            "price": "NA",
            "rating": "NA",
            "source": "AokLok",
            "title": "Japanese Samurai Cat T-Shirt – AokLok (Kclot)"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNdzaXYmWRABja1y4dUibhmohystA7_FlFjx2yjPoQrm0p6thf",
            "link": "https://easternbreezes.com/product/cat-t-shirt/",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcSpFdxyUjaUwEEM7itew5rGkLnauoxeX0czaAoTFdCNm9xtXjBGpOZCjYfR1KzhIKvkLrQc3Ntxt423GYNOR1wZpu5nNMYqfGUV97yG-uzEQfORxuiSWB8",
            "price": "NA",
            "rating": "NA",
            "source": "easternbreezes.com",
            "title": "Samurai Cat 57b - Eastern Breezes"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR1--GTyFoBnNLD9CnqznPXzEf-WyMUt5CUocy8LBXcipA3ZWwI",
            "link": "https://www.etsy.com/in-en/listing/1013048687/neko-ronin",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcSBC4oQ3bkBuevoH8XpxAl0ri8XiuLd4I543l3vUizk2p7JnS_Kl1aJTVxs9nt4vEC2m0siqwjI-o3Mysd9TaJqSrdOdkseIKFJA66bIfBIaDs",
            "price": "NA",
            "rating": "NA",
            "source": "Etsy",
            "title": "Buy Neko Ronin Online in India - Etsy"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT356QIWx1LNfRTRyRdIXrCTDG2A2cHkravwb-2-njM5KNksvqV",
            "link": "https://www.aliexpress.com/i/1005002383625980.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Women's Summer Blouse Samurai Cat Creative Design Women's Short Sleeve T-shirt Women's Shirt Short Sleeve Breathable T-shirt - Trainning & Exercise T-shirts - AliExpress"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTCBiZyY5uYDQZU9zNBSw7yLLX631HIb343lQFf0SB6pCw9sd06",
            "link": "https://www.reddit.com/r/translator/comments/19bn46z/japaneseenglish_what_does_this_shirt_say/",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcRFeJS-IhfJCysoVmCqJ1d-1lzbIHTsbcy4DrBsZJpxQ31zznhym7THnNEKCEnngpvdl4aupEFtEblIPBEMJY7_biy055d40m6TYfVg7CpFOrWOXw",
            "price": "NA",
            "rating": "NA",
            "source": "Reddit",
            "title": "[japanese>english] what does this shirt say? : r/translator"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTFWsBtRwbez_w_-LQPfReV3Y5v_79zZOSDSb9k3rJkB9w3g_FL",
            "link": "https://www.joom.com/geek/en/products/64c9ee148e265d01e9f44d1d",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcTZbm0hOgNcRLF_TnhOdpND_HPKJ8qc7ILtS6nQJzqofEbYaliCg3oncGw6oZk8_JJUHSh8UJZQGhX1teBnL0ql2wafJoNmXwuMmzipeiuz0XE",
            "price": "NA",
            "rating": "NA",
            "source": "joom.com",
            "title": "Summer Men's T-shirt 3D Animal Print Tees Cute Cat Loose Round Neck Short Sleeve Tops Men – the best products in the Joom Geek online store"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgsmX2D7CDjR8Q_bf8h_KyOCsPBa7xBDxeevVN0AWh9JIGmSsB",
            "link": "https://www.aliexpress.com/w/wholesale-full-metal-alchemist-brotherhood.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Fullmetal Alchemist: Brotherhood-Products with free shopping |on AliExpress"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSwo9vVcKKWq0ZVFgllYTJLKdCllIyLuSpEnNEt3swJQWmoqQxz",
            "link": "https://www.zazzle.com/japanese_samurai_cat_katana_ninja_yakuza_tattoo_t_shirt-235851266324012581",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcRBZ6gc0BDSGhB_wpRoYnT9KE9v6Bd28unbqLEEB2Lv5BCjCfJApMFk27RULX0ZT7Un1k-z2bM-RS54bnRSqM7NCcLukxNCxFrRTMI6BlxolHZd3w",
            "price": "NA",
            "rating": "NA",
            "source": "Zazzle",
            "title": "Japanese Samurai Cat Katana Ninja Yakuza Tattoo T-Shirt | Zazzle"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR-nRfKx5xZrT6FpHRDUl8_R8f74JvhBI-Cis-a-zYrp5_pouaA",
            "link": "https://www.pampling.com/productos/13937-Psicopato",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSyGeVl9K3NhBgjiXNavUgfnJOQP_Y1l-VyfMTXXaWyA0ze8O9LSsPLwsNf__t99stf5G0MNJ9RT_Rq5LncbCfcKwYX8gdAjQeAMzoRH_yVfsEpblG",
            "price": "NA",
            "rating": "NA",
            "source": "Pampling",
            "title": "Psicopato by tobiasfonseca - Pampling.com T-shirts"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSPHEmFt5jgxxsDudQq3--6MLIOElcetObEONnr5VxnB2H4kbEd",
            "link": "https://www.redbubble.com/shop/catana",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRCAtmliek36Hrv8AAFeZIgkEoa8OCIVLUnMryiexJzpgNBxoCsvDF5CGtl_lEBN8unV-vClsufIguBCd8xv_Y11KEmGunvRbIgpA6ok37w1DxJSZnTrw",
            "price": "NA",
            "rating": "NA",
            "source": "Redbubble",
            "title": "Catana Merch & Gifts for Sale | Redbubble"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQy9Es9C5hx2WKkRh4nH_v1idO3qybsk9CFV5nhCfuEysTKd5Q1",
            "link": "https://vi.aliexpress.com/item/1005004789189792.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcTFbJQodbf3BrLlAhHGDbRaYjU21hw17i_CoVI3u3ms5_xytPDh8qMjDL1PyUrjJn7GmftGozzlc-Bp5X2HApfUF_SGybR7bTK4eOULam94gJwZcbNJ2w",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Unisex Cotton Japanese Style Cat Anime Samurai Sword Summer Men's Novelty T-Shirt Harajuku Streetwear Casual Women Soft Rock Tee"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLGVsYVvwcuFyPiNgZMii16B5FGWJuiJ9PhKB2cOvYLwR7hw8h",
            "link": "https://www.wickedclothes.com/products/catana-shirt",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcQEXmwlqqnAZYxgEjtNMq4SwNxC5oiUsUDu7ay8kMVjfTLfnMitKBMb6D615gOPxNbmPRepISIt7DS-_k17Hbv6owvNWQwoFfAMfmhQLauaPNzA55HIC_z6_aE",
            "price": "NA",
            "rating": "NA",
            "source": "Wicked Clothes",
            "title": "Catana Shirt – Wicked Clothes"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRH0IzMVteCNDCVkv3xatq-AQuJeXWe5RwUKhfS8a1r-wjW7pmP",
            "link": "https://threadheads.com/en-nz/products/neko-samurai-tshirt",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcScAC2bjeGlHLZdoSkcyaDspVwMCBlpZYBAQvNo3FHbgyDLgQ77TifkcfwMz4YxLFbRhZlEUFM6GfsVEVex8cXsBzF_0RmQRYC8zp7yiZTZq1uMtHo",
            "price": "NA",
            "rating": "NA",
            "source": "threadheads.com",
            "title": "Neko Samurai T-Shirt | Official Vincent Trinidad Art Merch | Threadheads"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR9H_DsD7-SmBNURt9PD3xVKFdjmTgUUKHn8MyH2nsbzBUgoRc0",
            "link": "https://japanese-clothing.com/products/catana-t-shirt",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcTe8s159aKATWwFNdwzP1K7mKEbPZIZk05fv0ICGJ9uvk22-yVhRvJU9ARuD1Q-LKZwKFn18JMHKYBUFdGJ0HIq3CpVgqRKl3L2e7OsoowqrfQ1oO7wv_B0hOI",
            "price": "NA",
            "rating": "NA",
            "source": "Japanese Clothing",
            "title": "Catana Shirt - Japanese Clothing"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR0wTkf6oMBElTpOSs3EEAAcyBordVYih4irRKrn4SMKZg1j5z3",
            "link": "https://www.walmart.com/ip/TeeFury-Men-s-Graphic-T-shirts-Catana-Cats-Samurai-Charcoal-3XL/293424868",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcTty0_uq5QGsSpEA1agUnwTMPZTu_YvS9mg_tzOR2qy22fR-FGLLoSmA4z4XotJkADD4W1gHczZdZT5PEPvM9Sv6mBjhn-lRnHs4p0G3COAlV8EwJE",
            "price": "NA",
            "rating": "NA",
            "source": "Walmart",
            "title": "TeeFury Men’s Graphic T-shirts Catana - Cats | Samurai | Charcoal | 3XL - Walmart.com"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQlEpW1C1AsOB31Tgj4Sl7cNFhkJtYrFeWuHkkmG1XBr3XF6iRT",
            "link": "https://keorm.com/products/warrior-cat-t-shirt",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQoDNllJjnWsP4FER-z_5Rj2NbJq8gCI3KcCKmi4S49qYdDXvB4oihLvhULTiEl4ZZXsVPgztg3rdO8vov21fyfEQXDoTLnGiijlzqzHzw",
            "price": "NA",
            "rating": "NA",
            "source": "Keorm",
            "title": "Warrior Cat T-Shirt – Keorm"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQU2L1V9-FjPhouW3Tuts2nXJFSQcNAAqUjyxqbvYdMErfYcd2x",
            "link": "https://shopee.co.id/New-Promo-Kaos-Distro-Kaos-Oblong-Kaos-Kekinian-Kaos-neko-samurai-jepang-full-cotton-30s-i.38919651.6977299098",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRwsViRC5kenJizjo0JswIWCBRluASMw-vOIKuD4bXaqDSZnSS_F4iXF_pius2bEbkZxyjfuf_ya3cx8rvUPfyzVcxp7rhe_fqUike-dXYgMdk",
            "price": "IDR 29,500.00*",
            "rating": "NA",
            "source": "Shopee",
            "title": "New Promo Kaos Distro/Kaos Oblong/Kaos Kekinian/Kaos neko samurai jepang full cotton 30s"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTUfwoERK6qDheI0CfCq-f0FJBya3vNXzJQdYDmW6dtTJADWd3l",
            "link": "https://www.paradis-japonais.com/produit/t-shirt-chat-japonais/",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRSEnk1NUSBC4peR0HrotA-fE32hE1GLg6vCZFBa99ew3DpE93K79P_OPov2uI_CIrSgsHig1SdXiwDYMJ5Tf7Db3vT0f3gvYXspsf1Bc7TmXMdE-Ry1z4hI_qVRVs",
            "price": "NA",
            "rating": "NA",
            "source": "Paradis Japonais",
            "title": "T-Shirt Chat Japonais | Paradis Japonais"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSz_pOXrbhlBcD8xqN1K9v6I4_iBcVQTNT25fb-VoCGjcH1L1Cw",
            "link": "https://www.temu.com/us-es/camiseta-grafica-de-gato-ninja-de-estiramiento-medio-casual-para-hombre-ropa-masculina-para-el-verano-g-601099514159965.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcTg3FnIH5Kw83S__QGkF6cFeWEL80lPXtXm2DiLjr3ZrR9-5FCdJ-Y0iphcm4rZ8tmxbdHkGsJeOyH5ayvRcsdqSaPDnnt003tQjPg4YlLPw0Y",
            "price": "NA",
            "rating": "NA",
            "source": "Temu",
            "title": "Camiseta Gráfica De Gato Ninja De Estiramiento Medio Casual - Temu"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLBgPXymyVyc5Xqg-cxRqnOvSS-NXPzsFnu-u02SAFPMWxlCs2",
            "link": "https://aliexpress.ru/item/1005003120162740.html",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcTCvDIY_wF_HmSQOTmgeQHuIYWqzK07um84L_F24BwcNwW0SYcqw-0S7-uxcgKp1exI0jL8LmViwdYEK9kWX6xr0xaIh2JSSmzcJvA6v-VgaZSC",
            "price": "NA",
            "rating": "NA",
            "source": "Aliexpress.ru",
            "title": "Футболка Catana Мужская в стиле ретро, крутая тенниска из 100% хлопка, забавная майка с рисунком кошки в стиле аниме, топ в японском стиле Харадзюку, на лето | AliExpress"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCYtiGVFXjM0XaMzaGbIDV5biZD0en3ba3gdwzv6dGUkxv0toV",
            "link": "https://www.checkpoint-tshirt.com/products/katana-chat-japonais-tatoue-facon-yakusa-tshirt-homme",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRih9Ry-C-w9Q6mP3oZmB74DEiNBpGSGzWtsBfTXQWPnqmZywBT2CIwSPGObjmb1WHbli60_7qHkUWCNGOH72xS8HE1_OGztzMFZcz78e4uNp5F1pne2N3Y4I3230zW",
            "price": "NA",
            "rating": "NA",
            "source": "Checkpoint Tshirt",
            "title": "Tshirt Homme Katana – Délicieux mélange d’un chat et de Yakusa"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT5bHjEkrki_XXtL28zoQaALfdhvH4kFFe--ivwLrv_AHbZ5zTg",
            "link": "https://aliexpress.ru/item/1005004689387538.html",
            "logo": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcTCvDIY_wF_HmSQOTmgeQHuIYWqzK07um84L_F24BwcNwW0SYcqw-0S7-uxcgKp1exI0jL8LmViwdYEK9kWX6xr0xaIh2JSSmzcJvA6v-VgaZSC",
            "price": "NA",
            "rating": "NA",
            "source": "Aliexpress.ru",
            "title": "Лидер продаж, футболка в стиле японского аниме с мультяшным Самураем, кошкой, уличная графическая футболка в стиле Харадзюку, забавный стиль, Хлопковая мужская футболка с круглым вырезом | AliExpress"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQeRAxXwW_wK9XL-ROv7pofObJcmiXr3eMEJW6UzHXSAi6-H1iJ",
            "link": "https://www.joom.ru/ru/products/6138819ac3e24e01a952bc8f",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcQ24OJEjX8CFygenP_XoZ-YocA2G7b7cVAp07PDQXciWICnTlAahaEiH8RoL3RxGU7gWFn05CmAXk_GkzLisKZdbr0NALEIbjS3B-d_v5lNuw",
            "price": "NA",
            "rating": "NA",
            "source": "Джум",
            "title": "Men Catana Cool Summer Loose Men /Women T Shirt Casual Short Sleeve Cat Print Anime Tshirt Japanese Summer T -Shirt Tops Tee Shirt купить недорого — выгодные цены, бесплатная доставка, реальные отзывы с фото — Joom"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTJyNBqcdiajpVafmllQBOGRMWtUzkJjrdNJwjcBvvcuz0MOpOQ",
            "link": "https://www.redbubble.com/i/t-shirt/Ninja-cat-by-Dittery/112731096.FB110",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRCAtmliek36Hrv8AAFeZIgkEoa8OCIVLUnMryiexJzpgNBxoCsvDF5CGtl_lEBN8unV-vClsufIguBCd8xv_Y11KEmGunvRbIgpA6ok37w1DxJSZnTrw",
            "price": "NA",
            "rating": "NA",
            "source": "Redbubble",
            "title": "\"Ninja cat \" Essential T-Shirt by Dittery | Redbubble"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQumcWS22NqJVQbNmiEq6kICe9CqhtW9WPBKqw2w5s0z_yGLFyf",
            "link": "https://www.aliexpress.com/i/1005001397545787.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "$7.39*",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Japanese Style Cat Anime Samurai Sword Quality T Shirt Summer Cool Ptint T Shirts Street Funny Short Sleeve Top Men Rock Tshirt"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ0K4AJSRgRpG7KqQzDBywYIJx1cJoPD7UVAzSAD3slsb16L5HS",
            "link": "https://s.click.aliexpress.com/deep_link.htm?aff_short_key=UneMJZVf&dl_target_url=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F4001291834958.html%3F_randl_currency%3DGBP%26_randl_shipto%3DGB%26src%3Dgoogle",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRi1yREW8HmBeYTRXtsP0KH2bIFXcbDlVLEPCNM46IDGJZtdngQVzL5CeVvkrid7dZ_T6dOzK89j3VieC1AR5zsaKzKOkKVv6DBAPygXKHf7-BWj1Zf1qPjyvoB",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "COOLMIND Pure Cotton Streetwear Cat Print Men T Shirt Casual Loose Short Sleeve Men Tshirt o-neck t-shirt Men Tee Shirts Tops"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRA606P0avs9zKqZ_1i92IRPUIhCq0BWBhKPtVx6ELfJt48JUT0",
            "link": "https://www.aliexpress.com/i/1005004538319374.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Sleeve Cat Print Anime Tshirt Japanese T Shirt For Men Limitied Edition Unisex Brand T-shirt Cotton Amazing Short Sleeve Tops - T-shirts - AliExpress"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS2l19umPyqZPnpdb0YD6b-4T6gUaRbYNpK7kQGStd2es3_urcw",
            "link": "https://www.aliexpress.com/item/1005003641600106.html?_randl_currency=GBP&_randl_shipto=GB&src=google",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Oversize tee 3D Print Japanese Samurai Cat T-shirt Cool Classic Art Casual Plus Size 5xl Harajuku Streetwear Jogger Shirt 6xl"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTBwuEDd19DF2G0BeaofvTZSCwzz8DIlsuddsogFwUzXF4nbxC",
            "link": "https://www.ebay.com/itm/285512798089",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcT5NXsW5qpQoNKtvnEC0sNL88H54opWmBBYIh2gQ3U_SGUU-yc8xV_BfeECVq4HYfwroQsx3k4lpMvjDByZM4KvONyK63j7aI6RPQrDFwRa9lo",
            "price": "NA",
            "rating": "NA",
            "source": "eBay",
            "title": "Threadless Vincent Trinidad Men's Medium Black Cat Knife Short Sleeve T-Shirt | eBay"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTSIAj_1NTLfysqt30sccax5r-o3a_Sj0zoJoHg-qHnekFFNt0r",
            "link": "https://www.redbubble.com/i/t-shirt/Catana-by-vincenttrinidad/43638443.FB110",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRCAtmliek36Hrv8AAFeZIgkEoa8OCIVLUnMryiexJzpgNBxoCsvDF5CGtl_lEBN8unV-vClsufIguBCd8xv_Y11KEmGunvRbIgpA6ok37w1DxJSZnTrw",
            "price": "NA",
            "rating": "NA",
            "source": "Redbubble",
            "title": "\"Catana\" Essential T-Shirt for Sale by vincenttrinidad | Redbubble"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRDEs0y99s1bECp0p0nniVUFownWIpwk8aIp4QQnWiwTlaeJe6y",
            "link": "https://www.redbubble.com/i/t-shirt/Japan-cat-samurai-art-by-Annelley/79943989.FB110",
            "logo": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRCAtmliek36Hrv8AAFeZIgkEoa8OCIVLUnMryiexJzpgNBxoCsvDF5CGtl_lEBN8unV-vClsufIguBCd8xv_Y11KEmGunvRbIgpA6ok37w1DxJSZnTrw",
            "price": "NA",
            "rating": "NA",
            "source": "Redbubble",
            "title": "\"Japan cat -samurai art\" Essential T-Shirt for Sale by A W | Redbubble"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZZdeCBYcl1MB4m821FNqvTc_24D0QLe8kipeOiT1mP79COO-f",
            "link": "https://www.aliexpress.com/item/1005003913057184.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "$3.99*",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Japan Catana Samurai Cat Tshirts Funny Bad Ass Cat Print Short-sleev Tee Women Men Casual Fashion Streetwear Roupas Masculinas"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTJbYhE3Wby7tl6uZ1crbfdVnPmWf4rYXUl0lVJyEF_2o8dobhw",
            "link": "https://www.ebay.com/itm/125289847196",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcT5NXsW5qpQoNKtvnEC0sNL88H54opWmBBYIh2gQ3U_SGUU-yc8xV_BfeECVq4HYfwroQsx3k4lpMvjDByZM4KvONyK63j7aI6RPQrDFwRa9lo",
            "price": "NA",
            "rating": "NA",
            "source": "eBay",
            "title": "Samurai Ninja Cat Mens Sz M Black T Shirt Threadless Designer NEW | eBay"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGuoxGy5IVLX52s4gOCaFgYdc7ZsFSK0HaOJZqBwlKz9_7efHQ",
            "link": "https://s.click.aliexpress.com/deep_link.htm?aff_short_key=UneMJZVf&dl_target_url=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005003528797958.html%3F_randl_currency%3DKWD%26_randl_shipto%3DKW%26src%3Dgoogle",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRi1yREW8HmBeYTRXtsP0KH2bIFXcbDlVLEPCNM46IDGJZtdngQVzL5CeVvkrid7dZ_T6dOzK89j3VieC1AR5zsaKzKOkKVv6DBAPygXKHf7-BWj1Zf1qPjyvoB",
            "price": "$3.96*",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Women's Clothing T-shirt Tops Fashion Casual Cartoon Japanese Orange Cat Pattern Printing Slim Round Neck Commuter Black T-shirt"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRtjBQW-L-O1E2kQkn9QUxM4iiuC7BywC5B6Cr3XYDjX_aKBQsX",
            "link": "https://www.aliexpress.com/i/1005003101396664.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Japan Style Cat Print Men Shirt | Japanese Mens Shirts Cat | Cat Tee Shirts Man - Men's - Aliexpress"
        },
        {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRKPBXMtLJr36EETG-vochQ0pXjz4tSse0UWQ2fgsMe_wBwnNox",
            "link": "https://www.aliexpress.com/i/1005005339890424.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Japanese Cartoons Cat Printed T Shirt For Female Summer New Short Sleeve Comfortable Hot Sale Casual T-shirts Fashion Tops - AliExpress"
        },
        {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRm5WpoF9d9pDcgGUMWZi0BOB8jxlIkgRyt4zCwilqCS-C1Q0T8",
            "link": "https://s.click.aliexpress.com/deep_link.htm?aff_short_key=UneMJZVf&dl_target_url=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F3256805161799721.html%3F_randl_currency%3DUSD%26_randl_shipto%3DUS%26src%3Dgoogle",
            "logo": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRi1yREW8HmBeYTRXtsP0KH2bIFXcbDlVLEPCNM46IDGJZtdngQVzL5CeVvkrid7dZ_T6dOzK89j3VieC1AR5zsaKzKOkKVv6DBAPygXKHf7-BWj1Zf1qPjyvoB",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Cat Warrior Cotton Print Man T-Shirts Street Comfortable T-Shirt Harajuku Hip Hop Tee Shirt Round Neck Fashion All-Match Tshirts"
        },
        {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS-2epCUk2Y0yP6xrcNBeMP8JAo07vqNqUlcDtjwACtTry_nNZq",
            "link": "https://www.aliexpress.com/item/1005004694508293.html",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcQSZh_doafkxZW4WnM8O9V_jkhKLs1gPbNiXgOr3ARzlWk8o5MRYTd7bH_Z736ajGgVHGkfdtF0E1zxcBp9OdbuTT0VazgF9JKWcslyAoTrAGwT-7ftOSc",
            "price": "NA",
            "rating": "NA",
            "source": "AliExpress",
            "title": "Woman Japan Cat Print Harajuku Summer Fashion Tshirts Casual Round Neck Short Slee Top Tee Shirt Women Black T-shirt Drop Ship"
        },
        {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzIF7pkZH3zE_360ykkQrkunVy_GHvX9xdCKOwQe5mwB-g1Rw",
            "link": "https://www.etsy.com/in-en/listing/1309582824/katana-japanese-cat-japan-art-cute-t",
            "logo": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcSBC4oQ3bkBuevoH8XpxAl0ri8XiuLd4I543l3vUizk2p7JnS_Kl1aJTVxs9nt4vEC2m0siqwjI-o3Mysd9TaJqSrdOdkseIKFJA66bIfBIaDs",
            "price": "₹2,365.00*",
            "rating": "NA",
            "source": "Etsy",
            "title": "Katana Japanese Cat Japan Art Cute / T-shirt Unique Design Street Wear Art Urban Graphic Tees Top"
        }
    ];
    console.log(results);
    let a=0;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SearchWithIcon
        placeholder="want something different"
        className="items-center justify-center"
      />

      {results.length===0? (
      <div className="flex flex-col items-center gap-4 mt-16 mb-8">
         <Lottie className="dark:bg-gray-500 bg-gray-200 rounded-full" animationData={animationData} loop={true} />
        <p className="flex justify-center dark:text-gray-500 text-center text-gray-700">We are a young startup, please wait while loading the results. May take upto 45-60 seconds.</p>
      </div>): ""}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {results.length=== 0 ? (
                Array.from({ length: 15 }).map((_, index) => (
                <SkeletonCard key={index}/>
                ))
            ) : (
                results.map((card) => (
                <ProductCard
                    className="w-full cursor-pointer"
                    key={card.id}
                    cardData={card}
                />
                ))
            )}
      </div>
    </div>
  );
};

export default SearchPage;

{/* <Image
width={100}
height={100}
src={cardData.logo}
alt="source website logo"
className="w-5 h-5"
/> */}

