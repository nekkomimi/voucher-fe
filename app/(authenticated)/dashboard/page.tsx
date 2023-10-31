'use client'

import { Card, Col, Row, Statistic } from "antd";
import { AiOutlineSwap, AiOutlineShoppingCart, AiOutlineFileDone } from "react-icons/ai";

const Dashboard = () => {
    return (
        <div>
            {/* <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <div className="w-full py-5">
                <div className="grid grid-cols-3 gap-x-8 gap-y-8">
                    <div className="flex flex-col items-center justify-center p-6 bg-blue-400 border border-gray-200 rounded-lg shadow-md hover:bg-blue-200">
                        <h2 className="text-center text-5xl">{100}</h2>
                        <h3 className="text-center text-2xl">Total Customer</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-green-400 border border-gray-200 rounded-lg shadow-md hover:bg-green-200 ">
                        <h2 className="text-center text-5xl">{100}</h2>
                        <h3 className="text-center text-2xl">Total Wallet Balance</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-yellow-400 border border-gray-200 rounded-lg shadow-md hover:bg-yellow-200 ">
                        <h2 className="text-center text-5xl">{100}</h2>
                        <h3 className="text-center text-2xl">Total Transaction</h3>
                    </div>
                </div>
            </div> */}
            <div className="flex flex-wrap ">
                <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Transaction</h5>
                                    <span className="font-semibold text-xl text-blueGray-700">334,100</span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                                        <AiOutlineSwap />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 2,99% </span>
                                <span className="whitespace-nowrap"> Since last month </span></p>
                        </div>
                    </div>
                </div>

                <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Vouchers Sold</h5>
                                    <span className="font-semibold text-xl text-blueGray-700">2,999</span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                                        <AiOutlineShoppingCart />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i> 4,01%</span>
                                <span className="whitespace-nowrap"> Since last week </span></p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Gold Membership Vouchers Available</h5>
                                    <span className="font-semibold text-xl text-blueGray-700">901</span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-amber-500">
                                        <AiOutlineFileDone />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i> 1,25% </span>
                                <span className="whitespace-nowrap"> Since yesterday </span></p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Diamond Membership Vouchers Available</h5>
                                    <span className="font-semibold text-xl text-blueGray-700">51.02% </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-emerald-500">
                                        <AiOutlineFileDone />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 12% </span>
                                <span className="whitespace-nowrap"> Since last mounth </span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;