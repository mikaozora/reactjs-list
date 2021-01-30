import React, { Component } from "react"
import $ from 'jquery';

class cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: "", // untuk menyimpan data nama user
            total: 0, // untuk menyimpan data total belanja
            selectedItem: null,
            
        }
        

    }
    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }


        // memanggil data user pada localStorage
        let userName = localStorage.getItem("user")

        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahBeli)
        })

        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    delete = (item) => {
        if(window.confirm("Apakah Anda yakin ingin menghapus item ini?")){
            let tempCart = this.state.cart
            let index = tempCart.indexOf(item)
            //hapus
            tempCart.splice(index, 1)
            //ubha cart
            this.setState({cart : tempCart})
            //simpan
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
    }

    update = (item) => {
        $("#edit_jumlah").modal("show")
        this.setState({
            jumlahBeli : item.jumlahBeli,
            selectedItem : item,
            action : "update"
        })
    }

    Simpan = (event) => {
        event.preventDefault();
        let tempCart = this.state.cart
        this.state.action = "update"
        let index = tempCart.indexOf(this.state.selectedItem)
        tempCart[index].jumlahBeli = this.state.jumlahBeli
        
        this.setState({cart: tempCart})
        localStorage.setItem("cart", JSON.stringify(tempCart))
        $("#edit_jumlah").modal("hide")
    }


    componentDidMount() {
        this.initCart()
    }

    render() {
        return (
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>Data Keranjang Belanja</h4>
                    </div>

                    <div className="card-body">
                        <h5 className="text-primary">
                            Nama User: {this.state.user}
                        </h5>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.judul}</td>
                                        <td>Rp {item.harga}</td>
                                        <td>{item.jumlahBeli}</td>
                                        <td>
                                            Rp {item.harga * item.jumlahBeli}
                                        </td>
                                        <td>
                                        <button className="btn btn-sm btn-info m-1" onClick={() => this.update(item)}>Edit</button>
                                        <button className="btn btn-sm btn-danger m-1" onClick={() => this.delete(item)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h4 className="text-danger">
                            Total Harga: Rp {this.state.total}
                        </h4>
                    </div>
                </div>
                <div className="modal" id="edit_jumlah">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Buku
                        </div>

                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Simpan(ev)}>
                                    Jumlah Item
                                <input type="text" className="form-control mb-2"
                                        value={this.state.jumlahBeli}
                                        onChange={ev => this.setState({ jumlahBeli: ev.target.value })}
                                        required />
                                <button className="btn btn-dark btn-block" type="submit">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default cart