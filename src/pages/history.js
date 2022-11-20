import ConversionHistory from "../components/conversionHistory";

const HistoryPage = () => {
    return (
        <div  className="conversion-page column-container">
            <div className="page-title">
                Conversion History
            </div>
            <ConversionHistory/>
        </div>

    );
}

export default HistoryPage;