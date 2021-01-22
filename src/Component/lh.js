import React, { Component } from 'react';
import $ from 'jquery';

class agenda extends React.Component { 
    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    savehari = (event) => {
        event.preventDefault();
        let temp = this.state.agenda;
        if(this.state.action === "insert"){
            temp.push({
               nama : this.state.nama,
               nama_event : this.state.nama_event,
               tanggal : this.state.tanggal 
            });
        }else if(this.state.action === "update"){
            let index = temp.findIndex(item => item.nama === this.state.nama);
            temp[index].nama_event = this.state.nama_event;
            temp[index].tanggal = this.state.tanggal;
        }
        this.setState({agenda:temp});
        $("#modal").modal('hide');
    }
    Add = () => {
        this.setState({
            nama : "",
            nama_event : "",
            tanggal : "",
            action : "insert"
        });
    }
    Edit = (item) => {
        this.setState({
            nama : item.nama,
            nama_event : item.nama_event,
            tanggal : item.tanggal,
            action : "update"
        });
    }
    Drop = (index) => {
        let temp = this.state.agenda; 
        temp.splice(index,1);
        this.setState({agenda:temp})
    }
    constructor() {
        super();
        this.state = {
            agenda : [
                { nama : "Hari Bumi", nama_event: "The Social Justice Film Festival", tanggal : "20-08-2020"},
                { nama : "Hari Peduli Sampah Nasional", nama_event: "Penanaman Bibit Pohon secara seremonial oleh Ibu Menteri LHK RI", tanggal : "02-05-2020"}
            ],
            nama: "",
            nama_event: "",
            tanggal : "",
            action : ""
        }
    }
    render() {
        return (
            <div className="container">
                <ul className="list-group">
                    {this.state.agenda.map((item, index) => {
                        return(
                            <li className="list-group-item" key={index}>
                                <h5 className="text-info">{item.nama}</h5>
                                <h6>Nama Event: {item.nama_event}</h6>
                                <h6>Tanggal Event: {item.tanggal}</h6>
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
                            <div className="modal-header bg-dark text-white">
                                <h5>Form Agenda Hari Lingkungan Hidup</h5>
                            </div>
                            <form onSubmit={this.savehari}>
                                <div className="modal-body">
                                    Hari Lingkungan Hidup
                                    <input type="text" name="nama" className="form-control" onChange={this.bind} value={this.state.nama} />
                                    Nama Event
                                    <input type="text" name="nama_event" className="form-control" onChange={this.bind} value={this.state.nama_event} />
                                    Tanggal Event
                                    <input type="date" name="tanggal" className="form-control" onChange={this.bind} value={this.state.tanggal} />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default agenda;