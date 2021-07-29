class HcodeGrid {

  constructor(configs) {

    configs.listeners = Object.assign({

      afterDeleteClick: event => {

        window.location.reload()
      },


      afterUpdateClick: event => {

        $('#modal-update').modal('show')

      },

      afterFormCreate: event => {

        window.location.reload()

      },

      afterFormUpdate: event => {

        window.location.reload()

      },

      afterFormUpdateError: event => {

        alert('Não foi possível enviar o formulário')

      },

      afterFormCreateError: event => {

        alert('Não foi possível enviar o formulário')
      },

      buttonClick: (btn, data, event) => {

        document.getElementById('modal-update-password').innerHTML.modal('show')

      }






    }, configs.listener)

    this.options = Object.assign({}, {
      formCreate: '#modal-create form',
      formUpdate: '#modal-update form',
      btnUpdate: 'btn-update',
      btnDelete: 'btn-delete',
      onUpdateLoad: (form, name, data) => {

        let input = form.querySelector('[name=' + name + ']');
        if (input) {
          input.value = data[value]
        }


      }
    }, configs)

    console.log(this.options)

    this.rows = [...document.querySelectorAll('table tbody tr')]

    this.initForms()
    this.initButtons()

  }

  initForms() {

    if (!this.options.deleteUrl === '/admin/contacts') {


      let formCreate = document.querySelector(this.options.formCreate)

      formCreate.save({

        success: () => {

          this.fireEvent('afterFormCreate')

        },
        failure: () => {

          this.fireEvent('afterFormCreateError')

        }

      })





      let formUpdate = document.querySelector(this.options.formUpdate)

      formUpdate.save({

        success: () => {

          this.fireEvent('afterFormUpdate')

        },
        failure: () => {

          this.fireEvent('afterFormUpdateError')

        }

      })

    }



  }

  fireEvent(name, args) {

    if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args)


  }

  btnUpdateClick() {


    this.fireEvent('beforeUpdateClick', [event])

    let tr = event.path.find(el => {

      return (el.tagName.toUpperCase() === 'TR')




    })


    tr.id = tr.children[0].innerText
    tr.menu = tr.children[2].innerText

    console.log(tr.id, tr.menu)



    this.fireEvent('afterUpdateClick', [event])



  }

  btnDeleteClick() {
    this.fireEvent('beforeDeleteClick')

    let tr = event.path.find(el => {

      return (el.tagName.toUpperCase() === 'TR')




    })


    tr.id = tr.children[0].innerText

    console.log(this.options.deleteUrl)
   

    if (this.options.deleteUrl === '/admin/emails/' || this.options.deleteUrl === '/admin/reservations/'  ){

      tr.menu = tr.children[1].innerText

    }else{

      tr.menu = tr.children[2].innerText

    }

    

    if (confirm(eval('`' + this.options.deleteMsg + ' ' + tr.menu + '?' + '`'))) {
      fetch(eval('`' + this.options.deleteUrl + tr.id + '`'), {

        method: 'DELETE'

      }).then(response => {

        response.json().then(json => {

          this.fireEvent('afterDeleteClick')

        })

      })
    }



  }

  initButtons() {

    this.rows.map(row => {

      [...row.querySelectorAll('.btn')].map(btn => {

        btn.addEventListener('click', event => {

          if (event.target.classList.contains(this.options.btnUpdate)) {

            this.btnUpdateClick(event)

          } else if (event.target.classList.contains(this.options.btnDelete)) {

            this.btnDeleteClick(event)

          } else {

            this.fireEvent('buttonClick', [event.target, event])


          }

        })

      })


    })




  }

}