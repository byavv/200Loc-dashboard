import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface IPageChangeEvent {
    page: number;
    maxPage: number;
    pageSize: number;
    total: number;
    fromRow: number;
    toRow: number;
}

@Component({
    selector: 'loc-paging-bar',
    templateUrl: './pager.html',
    styleUrls: ['./pager.scss'],
})
export class LocPagerComponent implements OnInit {

    private _pageSize: number = 10;
    private _total: number = 0;
    private _page: number = 1;
    private _fromRow: number = 1;
    private _toRow: number = 1;
    private _initialized: boolean = false;

    /**
     * pageSizeAll?: boolean
     * Shows or hides the 'all' menu item in the page size menu. Defaults to 'false'
     */
    @Input('pageSizeAll') pageSizeAll: boolean = false;

    /**
     * firstLast?: boolean
     * Shows or hides the first and last page buttons of the paging bar. Defaults to 'false'
     */
    @Input('firstLast') firstLast: boolean = true;

    /**
     * pageSize?: number
     * Selected page size for the pagination. Defaults to first element of the [pageSizes] array.
     */
    @Input('pageSize')
    set pageSize(pageSize: number) {
        if (this._pageSize !== pageSize) {
            this._pageSize = pageSize;
            this._page = 1;
            if (this._initialized) {
                this._calculateRows();
                this._handleOnChange();
            }
        }
    }
    get pageSize(): number {
        return this._pageSize;
    }

    /**
     * total: number
     * Total rows for the pagination.
     */
    @Input('total')
    set total(total: number) {
        this._total = total;
        this._calculateRows();
    }
    get total(): number {
        return this._total;
    }

    /**
     * range: string
     * Returns the range of the rows.
     */
    get range(): string {
        return `${!this._toRow ? 0 : this._fromRow}-${this._toRow}`;
    }

    /**
     * page: number
     * Returns the current page.
     */
    get page(): number {
        return this._page;
    }

    /**
     * page: number
     * Returns the max page for the current pageSize and total.
     */
    get maxPage(): number {
        return Math.ceil(this._total / this._pageSize);
    }

    /**
     * change?: function
     * Method to be executed when page size changes or any button is clicked in the paging bar.
     * Emits an [IPageChangeEvent] implemented object.
     */
    @Output('change') onChange: EventEmitter<IPageChangeEvent> = new EventEmitter<IPageChangeEvent>();

    ngOnInit(): void {
        this._calculateRows();
        this._initialized = true;
    }

    /**
     * navigateToPage?: function
     * Navigates to a specific valid page. Returns 'true' if page is valid, else 'false'.
     */
    navigateToPage(page: number, notify = true): boolean {
        if (page === 1 || (page >= 1 && page <= this.maxPage)) {
            this._page = page;
            if (notify) {
                this._calculateRows();
                this._handleOnChange();
            }else{
                this._calculateRows();
            }
            return true;
        }
        return false;
    }

    /**
     * firstPage?: function
     * Navigates to the first page. Returns 'true' if page is valid, else 'false'.
     */
    firstPage(): boolean {
        return this.navigateToPage(1);
    }

    /**
     * prevPage?: function
     * Navigates to the previous page. Returns 'true' if page is valid, else 'false'.
     */
    prevPage(): boolean {
        return this.navigateToPage(this._page - 1);
    }

    /**
     * nextPage?: function
     * Navigates to the next page. Returns 'true' if page is valid, else 'false'.
     */
    nextPage(): boolean {
        return this.navigateToPage(this._page + 1);
    }

    /**
     * lastPage?: function
     * Navigates to the last page. Returns 'true' if page is valid, else 'false'.
     */
    lastPage(): boolean {
        return this.navigateToPage(this.maxPage);
    }

    isMinPage(): boolean {
        return this._page <= 1;
    }

    isMaxPage(): boolean {
        return this._page >= this.maxPage;
    }

    private _calculateRows(): void {
        let top: number = (this._pageSize * this._page);
        this._fromRow = (this._pageSize * (this._page - 1)) + 1;
        this._toRow = this._total > top ? top : this._total;
    }

    private _handleOnChange(): void {        
        let event: IPageChangeEvent = {
            page: this._page,
            maxPage: this.maxPage,
            pageSize: this._pageSize,
            total: this._total,
            fromRow: this._fromRow,
            toRow: this._toRow,
        };
        this.onChange.emit(event);
    }

}