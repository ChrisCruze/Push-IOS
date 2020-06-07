import React, { useState, useEffect, Fragment } from "react";
import LoadingIndicator from "../Atoms/LoadingIndicator";

const LoadingIndicatorIcon = ({ isRefetching, refetch }) => {
  useEffect(() => {
    if (isRefetching) {
      refetch();
    }
  }, []);
  return <LoadingIndicator />;
};

const AnimatedLoading = ({ scrollAnimation, refetch, loading }) => {
  const [isRefetching, updateRefetching] = useState(false);
  scrollAnimation.addListener(({ value }) => {
    if (value < -50 && !isRefetching) {
      updateRefetching(true);
      setTimeout(() => {
        updateRefetching(false);
      }, 2000);
    }
  });
  return (
    <Fragment>
      {loading || isRefetching ? (
        <LoadingIndicatorIcon isRefetching={isRefetching} refetch={refetch} />
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};
export default AnimatedLoading;
