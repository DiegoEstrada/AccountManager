import React from 'react'
import {useSelector} from 'react-redux';

var imageLogo = require('../../common/img/accountManagerLogo.png')

export function SlideBar() {
    var isLoggedSelector = useSelector(state => state.isLogged);
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="/home" className="brand-link">
                <img src={imageLogo} alt="Account Manager Logo" className="brand-image img-circle elevation-4" /* style={{ opacity: '.8' }} */ />
                <span className="brand-text font-weight-light">Account Manager</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    {/* <div className="image">
                        <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div> */}
                    <div className="info">
                        <a href="/#" className="d-block">{isLoggedSelector.user}</a>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class with font-awesome or any other icon font library */}

                        <li className="nav-header">Consultas</li>
                        {/*Query Option*/ }
                        <li className="nav-item">
                            <a href="/home/#" className="nav-link">
                                <i className="nav-icon fas fa-search" />
                                <p>Búsqueda</p>
                            </a>
                        </li>
                        {/*./QUery Option*/ }

                        {/*Dasboard Option*/ }
                        <li className="nav-item">
                            <a href="/home/#" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>Dashboard</p>
                            </a>
                        </li>
                        {/*./Dasboard Option*/ }


                        {/*Manage Accounts */}
                        <li className="nav-header">Administración</li>
                        <li className="nav-item has-treeview">
                            <a href="/home/#" className="nav-link">
                                <i className="nav-icon fas fa-wallet"></i>
                                <p>
                                    Cuentas
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="/home/#" className="nav-link">
                                        <i className="fas fa-level-up-alt nav-icon" />
                                        <p>Activo</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/home/#" className="nav-link">
                                        <i className="fas fa-level-down-alt nav-icon" />
                                        <p>Pasivo</p>
                                    </a>
                                </li>
                               
                            </ul>
                        </li>

                        { /*./ Manage Accounts */}

                        {/*Clients Option*/ }
                        <li className="nav-item">
                            <a href="/home/#" className="nav-link">
                                <i className="nav-icon fas fa-user-alt" />
                                <p>Clientes</p>
                            </a>
                        </li>
                        {/*./Clients Option*/ }

                        {/*Transactions Option*/ }
                        <li className="nav-item">
                            <a href="/home/#" className="nav-link">
                                <i className="nav-icon fas fa-money-bill-wave" />
                                <p>Transacciones</p>
                            </a>
                        </li>
                        {/*./Transactions Option*/ }

                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>

    );
}