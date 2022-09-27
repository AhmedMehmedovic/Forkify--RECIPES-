import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parrentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parrentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return; // ako nema dugmeta vrati se odma ( da ne izbacuje gresku kad kliknemo pored dugmeta)

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  #generatePreviousBtn(currentPage) {
    return `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        `;
  }

  #generateNextBtn(currentPage) {
    return `
    <button data-goto="${
      ///uz data-goto dobijemo trebnutni broj stranice na koji smo kliknuli
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
  }
  _generateMarkup() {
    // definisanje trenutne stranice
    const currentPage = this._data.page;
    // broj stranica
    const numberPages = Math.ceil(
      // Math.ciel () zaokruzuje brojeve na cijele brojeve npr 5.9 = 6
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numberPages);
    //page 1 and there are other pages
    if (currentPage === 1 && numberPages > 1) {
      return this.#generateNextBtn(currentPage);
    }

    // last page
    if (currentPage === numberPages && numberPages > 1) {
      return this.#generatePreviousBtn(currentPage);
    }
    // other page
    if (currentPage < numberPages) {
      return (
        this.#generatePreviousBtn(currentPage) +
        this.#generateNextBtn(currentPage)
      );
    }

    // page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
