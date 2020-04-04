import React, { useReducer, useEffect, useMemo } from "react";
import { object } from "prop-types";
import SyncIcon from "@material-ui/icons/Sync";
import CloseIcon from "@material-ui/icons/Close";

// components
import Layout from "@components/Layout";
import SEO from "@components/Seo";
import Card, { ERROR_CARD, LOADING_CARD } from "@components/Card";
import Table from "./components/Table";

// modules
import Url from "@modules/url";
import reducer from "./modules/reducer";
import fetchOrders from "./modules/helpers";
import {
  initialState,
  STATE_INIT,
  STATE_EXITING,
  STATE_CANCELLING,
  BREADCRUMBS
} from "./modules/constants";

const OrdersIndex = ({ location }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { refetch, loading, cancelled, results, error, meta } = state;

  const pathname = location.pathname;
  const memoSearch = useMemo(() => Url.parseSearch(location.search), [
    location.search
  ]);
  useEffect(() => {
    const fetchFn = () => fetchOrders(memoSearch, dispatch);
    dispatch({ type: STATE_INIT, payload: fetchFn });
    fetchFn();
    return () => {
      dispatch({ type: STATE_EXITING });
    };
  }, [memoSearch]);

  function handleCancel(event) {
    event.preventDefault();
    dispatch({ type: STATE_CANCELLING });
  }
  const { rowsPerPage } = meta;

  return (
    <Layout breadcrumbs={BREADCRUMBS}>
      <SEO title="Orders" />
      {loading && (
        <Card
          type={LOADING_CARD}
          message="Synchronizing..."
          linkMessage={
            <>
              <CloseIcon /> cancel
            </>
          }
          onClick={handleCancel}
        />
      )}
      {cancelled && (
        <Card
          type={ERROR_CARD}
          message="API request cancelled"
          linkMessage={
            <>
              <SyncIcon /> refetch
            </>
          }
          onClick={refetch}
        />
      )}
      {error ? (
        <Card
          type={ERROR_CARD}
          message="There was an error"
          linkMessage={
            <>
              <SyncIcon /> retry
            </>
          }
          onClick={refetch}
        />
      ) : (
        <Table
          title="Orders"
          rows={results}
          rowsPerPage={rowsPerPage}
          onFiltersChange={filters => {
            Url.updateSearch(pathname, { ...memoSearch, ...filters });
          }}
          onSync={refetch}
          headers={[
            {
              id: "id",
              numeric: false,
              disablePadding: false,
              label: "N. Orden"
            },
            {
              id: "name",
              numeric: false,
              disablePadding: false,
              label: "R.Social"
            },
            {
              id: "condition",
              numeric: false,
              disablePadding: false,
              label: "Condición"
            },
            {
              id: "buyDate",
              numeric: false,
              disablePadding: false,
              label: "Fecha Orden"
            },
            {
              id: "actions",
              numeric: false,
              disablePadding: false,
              label: "Actions"
            }
          ]}
          // noResults=""
          // filters={
          //   <Paper className={classes.searchPaper}>
          //     <InputBase
          //       className={classes.input}
          //       onChange={event =>
          //         handleSearch(event.currentTarget.value)
          //       }
          //       placeholder="Search"
          //       inputProps={{
          //         'aria-label': 'search users',
          //         defaultValue: search
          //       }}
          //     />
          //     <IconButton
          //       className={classes.iconButton}
          //       aria-label="search"
          //     >
          //       <SearchIcon />
          //     </IconButton>
          //   </Paper>
          // }
        />
      )}
    </Layout>
  );
};

OrdersIndex.propTypes = {
  location: object
};

OrdersIndex.defaultProps = {
  location: { search: "", pathname: "" }
};

export default OrdersIndex;
