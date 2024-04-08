import React, { useEffect } from 'react';
import { GiReceiveMoney } from 'react-icons/gi';
import { TbAffiliate, TbSend } from 'react-icons/tb';
import 'styles/affiliate.scss';
import { BiCopy } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { TiSortAlphabetically, TiSocialFacebook } from 'react-icons/ti';
import { BsLink } from 'react-icons/bs';
import Table from '../components/table/tableView';
import {
  AiOutlineTwitter,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from 'react-icons/ai';
import { FaTelegram } from 'react-icons/fa';
import { affiliateUsers, refCode } from 'store/actions/affiliateActions';

function Affiliate() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.affiliate);
  useEffect(() => {
    dispatch(refCode());
    dispatch(affiliateUsers());
  }, []);

  const mungeEmailAddress = (s) => {
    const i = s.indexOf('@');
    const startIndex = i * 0.2;
    const endIndex = i * 0.9;
    return (
      s.slice(0, startIndex) +
      s.slice(startIndex, endIndex).replace(/./g, '*') +
      s.slice(endIndex)
    );
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      isVisible: true,
      Cell: ({ cell }) => (
        <>
          <p>{cell.value}</p>
        </>
      ),
    },
    {
      Header: 'Email',
      accessor: 'email',
      isVisible: true,
      Cell: ({ cell }) => (
        <>
          <p>{mungeEmailAddress(cell.value)}</p>
        </>
      ),
    },
    {
      Header: 'Level',
      accessor: 'level',
      isVisible: true,
    },
    {
      Header: 'Subscription',
      accessor: 'bots',
      isVisible: true,
      Cell: ({ cell }) => (
        <>{cell.value > 0 ? <p>{cell.value}</p> : <p>Inactive</p>}</>
      ),
    },
  ];
  return (
    <>
      <div className="flex w-full gap-4 flex-row md:flex-col">
        <div className="w-full">
          <div id="inviteemail">
            <h2 className="text-2xl dark:text-gray-50">Invite your friends</h2>
            <p className="text-sm dark:text-gray-50">
              Enter your friend address and send them invitation to join
              Metronix
            </p>
            <div className="py-[2rem] w-full h-full flex justify-start items-center">
              <form
                action="/search"
                method="get"
                className="md:w-[550px] md:h-[50px]  focus-within:outline-none focus-within:ring focus-within:ring-gray-400 m-auto w-[300px] h-[45px] bg-white border border-gray-400 flex items-center justify-between overflow-hidden rounded transition-all duration-[0.2s] ease-[ease] outline-[3px] outline-transparent outline"
              >
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full outline-none py-0 px-4 "
                />

                <span className="h-full items-center flex">
                  <TbSend
                    size={24}
                    className="text-gray-50 cursor-pointer text-[15px] bg-green-100 rounded w-10 h-10 text-center my-0 mx-auto block pl-2 pr-[9px] pt-px pb-0 mr-1 "
                  />
                </span>
              </form>
            </div>
          </div>

          <div className="relative my-10 mx-0" id="socialmedia">
            <div className="overflow-hidden text-[0] text-center w-full my-[-30px] mx-0">
              <div className="social-share-btns overflow-hidden inline-block mb-5">
                <a
                  className="bg-[#00aced] hover:bg-[#238ab0] flex center justify-around float-left my-0 mx-[5px] py-[3px] px-1 md:py-[8px] md:px-[20px] rounded text-[#fff] text-[10px] md:text-[14px]"
                  href={`https://twitter.com/intent/tweet?text=Invitation%20to%20Metronix%0A&url=https://metronix-trading.club/signup/${data.refcode}`}
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  <AiOutlineTwitter className="mr-[5px] inline-block text-[12px] md:text-[18px] align-middle " />
                  Tweet
                </a>
                <a
                  className="bg-[#3b5998] hover:bg-[#334c83] flex center justify-around float-left my-0 mx-[5px] py-[3px] px-1 md:py-[8px] md:px-[20px] rounded text-gray-50 text-[10px] md:text-[14px]"
                  href={`https://www.facebook.com/sharer/sharer.php??display=popup&u=https://metronix-trading.club/signup/${data.refcode}`}
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  <TiSocialFacebook className="mr-[5px] inline-block text-[12px] md:text-[18px] align-middle " />
                  Share
                </a>
                <a
                  className="bg-[#007bb6] hover:bg-[#0f6790] flex center justify-around float-left my-0 mx-[5px] py-[3px] px-1 md:py-[8px] md:px-[20px] ounded text-gray-50 text-[10px] md:text-[14px]"
                  href={`https://telegram.me/share/url?text=Invitation%20to%20Metronix&url=https://metronix-trading.club/signup/${data.refcode}`}
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  <FaTelegram className="mr-[5px] inline-block text-[12px] md:text-[18px] align-middle " />
                  Send
                </a>
                <a
                  className="bg-[#54EE71] hover:bg-[#3fc557] flex center justify-around float-left my-0 mx-[5px] py-[3px] px-1 md:py-[8px] md:px-[20px] rounded text-gray-50 text-[10px] md:text-[14px]"
                  href={`whatsapp://send?text=Invitation%20to%20Metronix%0Ahttps://metronix-trading.club/signup/${data.refcode} data-action="share/whatsapp/share"`}
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  <AiOutlineWhatsApp className="mr-[5px] inline-block text-[12px] md:text-[18px] align-middle " />
                  Send
                </a>
                <a
                  className="bg-[#f1c40f] hover:bg-[#d1a90d] flex center justify-around float-left my-0 mx-[5px] py-[3px] px-1 md:py-[8px] md:px-[20px] rounded text-gray-50 text-[10px] md:text-[14px]"
                  href={`mailto:?subject=Invitation to Metronix&amp;body=https://metronix-trading.club/signup/${data.refcode}`}
                  rel="nofollow noreferrer"
                  target="_blank"
                  title="via email"
                >
                  <AiOutlineMail className="mr-[5px] inline-block text-[12px] md:text-[18px] align-middle " />
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 mt-4 affdetail lg:grid-cols-2 sm:mb-8 md:mb-16 lg:mb-16 sm:grid-cols-1 md:grid-cols-1">
            <div className="col-span-1 cursor-pointer">
              <div className="p-3 bg-gray-50 rounded shadow-md sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 ">
                <div className="flex font-semibold justify-between items-center">
                  <span className="text-gray-500 dark:text-white">
                    Withdrawal available MEOX
                  </span>
                  <span className="w-10 h-10 flex items-center justify-center">
                    <GiReceiveMoney size={20} />
                  </span>
                </div>
                <h6 className="pb-2 text-lg font-bold text-green-100">
                  {data?.affiliatebalance?.toFixed(2)}
                </h6>
              </div>
            </div>
            <div className="col-span-1 ">
              <div className="p-3 bg-gray-50 rounded shadow-md sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 ">
                <div className="flex font-semibold justify-between items-center">
                  <span className="text-gray-500 dark:text-white ">
                    Total activ Affiliates
                  </span>
                  <span className="w-10 h-10 flex items-center justify-center">
                    <TbAffiliate size={24} />
                  </span>
                </div>
                <h6 className="pb-2 text-lg font-bold text-green-100">
                  {data.refcount}
                </h6>
              </div>
            </div>
            {/* <div className="col-span-1 cursor-pointer">
              <div className="p-3 bg-gray-50 rounded shadow-md sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 ">
                <div className="flex font-semibold justify-between items-center">
                  <span className="text-gray-500 dark:text-white">
                    Withdraw Metronix
                  </span>
                  <span className="w-10 h-10 flex items-center justify-center">
                    <GiWallet size={24} />
                  </span>
                </div>
                <h6 className="pb-2 text-lg font-bold text-green-100">
                  Coming Soon
                </h6>
              </div>
            </div> */}
          </div>
          <div className="grid gap-4 affcodes lg:grid-cols-2 sm:mb-8 md:mb-16 lg:mb-16 sm:grid-cols-1 md:grid-cols-1">
            <div className="col-span-1 cursor-pointer">
              <div className="p-3 bg-gray-50 rounded shadow-md sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 ">
                <div className="flex font-semibold justify-between items-center">
                  <span className="text-gray-500 dark:text-white">
                    Share Link
                  </span>
                  <span className="w-10 h-10 flex items-center justify-center">
                    <BsLink size={20} />
                  </span>
                </div>
                <div className="relative border flex mt-5 px-[15px] py-[3px] rounded border-solid border-gray-400 bg-white ">
                  <input
                    type="text"
                    className="md:text-[18px] text-[14px] text-[#555] w-[90%]  p-[5px] "
                    value={`https://metronix-trading.club/signup/${data.refcode}`}
                    disabled
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://metronix-trading.club/signup/${data.refcode}`
                      );
                    }}
                    className="text-gray-50 cursor-pointer text-[15px] bg-green-100 rounded w-10 h-10 text-center my-0 mx-auto block pl-2 pr-[9px] pt-px pb-0 mr-1 "
                  >
                    <BiCopy className="md:text-[18px] text-[14px]" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 cursor-pointer">
              <div className="p-3 bg-gray-50 rounded shadow-md sm:col-span-4 md:col-span-4 dark:bg-gray-800 dark:text-gray-300 ">
                <div className="flex font-semibold justify-between items-center">
                  <span className="text-gray-500 dark:text-white">
                    Referral Code
                  </span>
                  <span className="w-10 h-10 flex items-center justify-center">
                    <TiSortAlphabetically size={24} />
                  </span>
                </div>
                <div className="relative border flex mt-5 px-[15px] py-[3px] rounded border-solid border-gray-400 bg-white ">
                  <input
                    type="text"
                    className="md:text-[18px] text-[14px] text-[#555] w-[90%] px-[5px] py-[5px] "
                    value={data.refcode}
                    disabled
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(data.refcode);
                    }}
                    className="text-gray-50 cursor-pointer text-[15px] bg-green-100 rounded w-10 h-10 text-center my-0 mx-auto block pl-2 pr-[9px] pt-px pb-0 mr-1 "
                  >
                    <BiCopy className="md:text-[18px] text-[14px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Table columns={columns} data={data.refusers} paginationVisible />
        </div>
      </div>
    </>
  );
}

export default Affiliate;
