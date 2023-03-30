import LoadingSpinner from "@/components/LoadingSpinner";
import { useMeQuery } from "@/generated/graphql";
import { isServer } from "@/utils/isServer";
import { withApollo as WithApollo } from "@/utils/withApollo";
import { NextPage } from "next";
import React, { useEffect } from "react";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  if (!data) {
    return <LoadingSpinner />;
    // return (
    //   // <div className="p-2">An error occured. Check you network connection.</div>
    // );
  }
  // // if(!data.me) {

  console.log(data);
  return (
    <div className="p-4 flex justify-between">
      <div>
        {!data.me?.fullName.includes("undefined") && (
          <div className="">
            Hello <span className="font-bold">{data.me?.fullName}</span>
          </div>
        )}
        <div className="">
          Your email is <span className="font-bold">{data.me?.email}</span>
        </div>
      </div>

      {/*profile picture */}
      {data.me?.picture && <img src={data.me?.picture} alt="profile picture" />}
    </div>
  );
};

export default WithApollo({ ssr: false })(
  Profile as NextPage<unknown, unknown>
);
