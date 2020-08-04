import React from "react";
import PropTypes from "prop-types";

const PostPagination = ({ page, setPage, postCount }) => {
  let postsPerPage = 3;
  let totalPages;

  const pagination = () => {
    totalPages = Math.ceil(postCount && postCount.totalPosts / postsPerPage);
    if (totalPages >= 10) totalPages = 10;
    // console.log(totalPages);
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i * 2}>
          <button
            className={`page-link ${page === i && "activePage"}`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li>
          <button
            className="page-link"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
        </li>
        {pagination()}
        <li>
          <button
            className="page-link"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

PostPagination.propTypes = {
  page: PropTypes.object,
  setPage: PropTypes.func.isRequired,
  postCount: PropTypes.number.isRequired,
};

export default PostPagination;
