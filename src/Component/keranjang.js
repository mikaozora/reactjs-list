import React, { Component } from 'react';
import $ from "jquery"
class keranjang extends Component {
    constructor() {
        super();
        this.state = {
            keranjang: [
                {nama: "Gula", harga : 50000, jumlah : 2, total : 100000},
                {nama: "Chitato", harga : 3000, jumlah : 3, total : 9000},
                {nama: "Cabe", harga : 1000, jumlah : 5, total : 5000}
            ],
            nama : "",
            jumlah : 0,
            harga : 0,
            total : 0,
            selectedItem : null
        }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    Add = () => {
        $("modal_buku").modal("show")
        this.setState({
            nama : "",
            harga : "",
            jumlah : "",
            total : "",
            action : "insert"
        })
    }
    Edit = (item) => {
        $("modal_buku").modal("show")
        this.setState({
            nama : item.nama,
            harga : item.harga,
            jumlah : item.jumlah,
            total : item.total,
            action : "update",
            selectedItem : item
        })
    }
    Drop = (index) => {
        let temp = this.state.keranjang
        temp.splice(index,1)
        this.setState({keranjang:temp})
    }
    savekeranjang = (event) => {
        event.preventDefault();
        let temp = this.state.keranjang
        if(this.state.action === "insert"){
            temp.push({
                nama : this.state.nama,
                jumlah : this.state.jumlah,
                harga : this.state.harga,
                total : this.state.total
            })
        }else if(this.state.action === "update"){
            let index = temp.indexOf(this.state.selectedItem)
            temp[index].nama = this.state.nama
            temp[index].harga = this.state.harga
            temp[index].jumlah = this.state.jumlah
            temp[index].total = this.state.total
        }
        this.setState({keranjang: temp})
        $("#modal").modal('hide')
    }

    total = () => {
        let harga = this.state.harga
        let jumlah = this.state.jumlah
        let total = harga * jumlah
        this.setState({
            total : total
        })
    }

    render () {
        return(
            <div className="container">
                <ul className="list-group">
                    {this.state.keranjang.map((item,index) => {
                        return(
                            <li className="list-group-item">
                                <h5 className="text-info">{item.nama}</h5>
                                <h6>Harga : {item.harga}</h6>
                                <h6>Jumlah : {item.jumlah}</h6>
                                <h6>Total : {item.total}</h6>
                                <button className="btn btn-sm btn-primary m-1" onClick={() => this.Edit(item)}
                                data-toggle="modal" data-target="#modal">Edit</button>
                                <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(index)}>Hapus</button>
                            </li>
                        )
                    })}
                </ul>
                <button className="btn btn-sm btn-success m-3" onClick={this.Add}
                data-toggle="modal" data-target="#modal">Tambah Data</button>
                <div className="modal fade" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5>Form Keranjang</h5>
                            </div>
                            <form onSubmit={this.savekeranjang}>
                                <div className="modal-body">
                                    Nama Barang
                                    <input type="text" name="nama" className="form-control" onChange={this.bind} value={this.state.nama} />
                                    Harga 
                                    <input type="text" name="harga" className="form-control" onChange={this.bind} value={this.state.harga} />
                                    Jumlah
                                    <input type="number" name="jumlah" className="form-control" onChange={this.bind} value={this.state.jumlah} />
                                    Total
                                    <input name="total" className="form-control"  onChange={this.bind} readOnly />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" onClick={this.total}>Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default keranjang;