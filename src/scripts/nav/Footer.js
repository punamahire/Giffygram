export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `
        <footer class="footer">
            <div class="footer__item">
                <span>GiffyGram Posts &copy; since ${new Date().getFullYear()}  &emsp; &emsp; &emsp; &emsp; &emsp; Select Year: 
                <select id="yearSelection">
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                </select></span>
                <span id="postCount"></span>
            </div>
        </footer>
    `
}