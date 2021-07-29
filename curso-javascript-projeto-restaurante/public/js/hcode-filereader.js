class HcodeFileReader{

    constructor(inputEl, imgEl){

        this.inputEl = inputEl
        this.imgEl = imgEl

        this.initInputEvent()

    }

    initInputEvent(){

        document.querySelector(this.inputEl).addEventListener('change', event=> {
            
            this.reader(e.target.files[0]).then(result=>{

                document.querySelector(this.imgEl).src = result


            }).catch(err=>{

                console.error(err)

            })

        })

    }

    reader(file){
        
        return new Promise ((s,f)=>{

            let reader = new FileReader()

            reader.onload = function () {
                s(reader.result)
            }

            reader.onerror = function (){

                reader("Não foi possível ler a imagem!")

            }
    
            reader.readAsDataURL(file)

        })
      

    }



}