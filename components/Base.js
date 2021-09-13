
const Base = () => {
    const [data, setData] = React.useState({
        word: '',
        languaje: 'en'
    })

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSearch = (event) => {
        event.preventDefault
        if (data.word !=''){
            searchMeaning(event)
        }else{
            window.alert("There is no word to search")
        }
    }
    const searchMeaning = async (event) => {
        event.preventDefault()
        fetch("https://api.dictionaryapi.dev/api/v2/entries/" + data.languaje + "/" + data.word)
            .then((res) => res.json())
            .then((response) => {
                if (response.title == null) {
                    response.map(Item => {
                        const itemInside1 = Item.meanings
                        itemInside1.map((Item1, Index1) => {
                            if (Index1 == 0) {
                                const itemInside2 = Item1.definitions
                                var txtMeaning = ''
                                var txtExample = ''
                                var countMeaning = 0
                                var countExample = 0
                                itemInside2.map((Item2, Index2) => {
                                    if (Item2.definition != undefined) {
                                        if (txtMeaning != '') { txtMeaning = txtMeaning + '\n' }
                                        countMeaning++
                                        txtMeaning = txtMeaning + countMeaning + ') ' + Item2.definition
                                    }
                                    if (Item2.example != undefined) {
                                        if (txtExample != '') { txtExample = txtExample + '\n' }
                                        countExample++
                                        txtExample = txtExample + countExample + ') ' + Item2.example
                                    }
                                })
                                // ahora si insertarlo
                                window.document.frmedit.meaning.value = txtMeaning
                                if (txtExample == '') { txtExample = 'No example' }
                                window.document.frmedit.example.value = txtExample
                            }
                        })
                    })
                } else {
                    window.document.frmedit.meaning.value = response.title + '\n' + response.message
                }
            });
    }

    const handleClear = () => {
        window.document.frmedit.word.value = ''
        window.document.frmedit.meaning.value = ''
        window.document.frmedit.example.value = ''
        data.word = ''
    }

    return (
        <div className="col-md-12">
            <div className="row card">
                <form id="frmedit" name="frmedit">
                    <label>Search for:</label>
                    <div className="clr"></div>
                    <input id="word" type="text" className="form-control" name="word" onChange={handleInputChange}></input>
                    <div className="clr"></div>
                    <label>Meaning:</label>
                    <div className="clr"></div>
                    <textarea name="meaning" disabled className="form-control"></textarea>
                    <div className="clr"></div>
                    <label>Example:</label>
                    <div className="clr"></div>
                    <textarea name="example" disabled className="form-control"></textarea>
                    <div className="clr"></div>
                    <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
                    <label className="Label15"></label>
                    <button type="button" className="btn btn-success" onClick={handleClear}>Clean</button>
                </form>
            </div>
        </div>
    )
}