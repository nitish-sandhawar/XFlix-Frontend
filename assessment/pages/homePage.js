
import basePage from './basePage';

/**
 * This project is inspired from git@github.com:qualityshepherd/cypress-example.git
 * We have an extended version of this project for our testing.
 * Cypress seems to think having selectors in tests is ok? [SPOILER] it's not.
 * Nor is it good to have them in your page methods... so I'm just declaring
 * them as css strings and then use these in our methods.
 * Ie, we need only change the single var if the app's css changes
 *
 * Also, IMO, Cypress' view on page objects is _at best_ misguided
 */
const homePage = {
  url:            '/',
  genreClass: '.genre-btn',
  contentRatingClass: '.content-rating-btn',
  viewCountOption: '#view-count-option',
  releaseDateOption: '#release-date-option',
  sortByOption: '.sort-select',
  videoTileCard: '.video-tile-link > .video-tile',
  videoTileALink: '.video-tile-link',
  viewIframeClass: '.iframe-parent',
  uploadBtn: '#upload-btn',
  modalSubmitButtonId: '#upload-btn-submit',
  modalCancelButtonId: '#upload-btn-cancel',
  modalInputVideo: '#upload-btn-video',
  modalInputImage: '#upload-btn-image',
  modalInputTitle: '#upload-btn-title',
  modalInputGenre: '#upload-btn-genre',
  modalInputRating: '#upload-btn-content-rating',
  modalInputReleaseDate: '#upload-btn-release-date',
  videoTitleClass: '.video-title',
  searchInputId: '#search-input',
  educationButtonId: '#Education',
  sevenPlusId: '#7+',

  /**
   * test if post title exists
   * @param  {string} postTitle
   * @return {bool}
   */
  postTitleExists(postTitle) {
    return cy.get('a').contains(postTitle).should('exist')
  },

  genre() {
    return cy.get(this.genreClass)
  },

  contentRating() {
    return cy.get(this.contentRatingClass);
  },

  viewCount() {
    return cy.get(this.viewCountOption)
  },

  releaseDate() {
    return cy.get(this.releaseDateOption)
  },

  sortBy() {
    return cy.get(this.sortByOption)
  },

  videoTile() {
    return cy.get(this.videoTileCard)
  },

  videoTileLink() {
    return cy.get(this.videoTileALink)
  },

  viewIframe() {
    return cy.get(this.viewIframeClass)
  },

  uploadButton() {
    return cy.get(this.uploadBtn)
  },

  modalSubmitButton() {
    return cy.get(this.modalSubmitButtonId)
  },

  modalCancelButton() {
    return cy.get(this.modalCancelButtonId)
  },

  searchInput() {
    return cy.get(this.searchInputId)
  },

  education() {
    return cy.get(this.educationButtonId)
  },

  sevenPlus() {
    return cy.get(this.educationButtonId)
  },

  videoTitle() {
    return cy.get(this.videoTitleClass)
  },

  fillUploadVideoForm(videoDetails) {
    cy.get(this.modalInputVideo).type(videoDetails.link);
    cy.get(this.modalInputImage).type(videoDetails.image);
    cy.get(this.modalInputTitle).type(videoDetails.title);
    cy.get(this.modalInputGenre).click();
    cy.get('[data-value="' + videoDetails.genre + '"]').click();
    cy.get(this.modalInputRating).click();
    cy.get('[data-value="' + videoDetails.contentRating + '"]').click();
    cy.get(this.modalInputReleaseDate).type(videoDetails.releaseDate);
  },

  findVideoByTitle(text) {
    return cy.contains(this.videoTitleClass, text);
  }

}
export default {...basePage, ...homePage}

