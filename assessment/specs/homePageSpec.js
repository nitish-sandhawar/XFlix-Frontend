import homePage from "../pages/homePage";

describe("XFlix", () => {
  beforeEach(() => {
    homePage.goto();
  });

  it("should display 5 genre buttons on a row", () => {
    homePage.genre().should("have.length", 5);
  });

  it("should display 5 content rating buttons on a row", () => {
    homePage.contentRating().should("have.length", 5);
  });

  it("should not have same parent for genre and content rating buttons", () => {
    homePage
      .genre()
      .parent()
      .should("to.not.equal", homePage.contentRating().parent());
  });

  it('should not have "View Count" option selected in sort by dropdown on page load', () => {
    homePage.viewCount().should("not.to.be.selected");
  });

  it('should have "Release Date" option selected in sort by dropdown on page load', () => {
    homePage.releaseDate().should("to.be.selected");
  });

  it('should have "View Count" option selectable after clicking on the sort by dropdown', () => {
    homePage.sortBy().select("View Count");
    homePage.viewCount().should("to.be.selected");
  });

  it('should have "Upload" button on landing page on load', () => {
    homePage.uploadButton().should("to.have.length.of", 1);
  });

  it('should open video modal with "Submit" and "Cancel" buttons, on clicking "Upload" button', () => {
    homePage.modalSubmitButton().should("not.to.exist");
    homePage.uploadButton().click();
    homePage.modalCancelButton().focus();
    homePage.modalSubmitButton().should("to.be.visible");
    homePage.modalCancelButton().should("to.be.visible");
  });

  it('should open video modal on clicking "Upload" button and close it on clicking "Cancel" button in the modal', () => {
    homePage.uploadButton().click();
    homePage.modalCancelButton().focus();
    homePage.modalCancelButton().should("to.be.visible");
    homePage.modalCancelButton().click();
    homePage.modalCancelButton().should("not.to.exist");
  });

  it('should have at least 10 links (with class "video-tile-link") to different videos on page load.', () => {
    homePage.videoTileLink().should("to.have.length.of.at.least", 10);
  });

  it('should display the video page on clicking the first video tile (with class "video-tile") which has a parent element with class "video-tile-link"', () => {
    let videoTileList = homePage.videoTile();
    videoTileList.should("to.have.length.of.at.least", 10);
    videoTileList.first().click();
    homePage.viewIframe().should("to.have.length.of", 1);
  });
});
