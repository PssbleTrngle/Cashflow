import { faCog, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classes from 'classnames';
import React, { MemoExoticComponent, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Cell from './components/Cell';
import Dialog, { Provider as DialogProvider } from './components/Dialog';
import Navbar from './components/Navbar';
import Settings, { Provider as SettingsProvider, useSettingsProvider } from './components/Settings';
import Home from './pages/Home';
import './style/app.scss';

const SinglePage = ({ children }: { children: ReactNode }) => {
	return <section className='single'>{children}</section>;
}

const App = () => {

	const dialog = useState<JSX.Element | null>(null);

	const [settings, setSettings] = useSettingsProvider();
	const { theme } = settings.client;

	const pages: IPage[] = [
		{ path: '/home', component: Home },
		{ path: '/settings', component: Settings, icon: faCog },
	];

	return (
		<SettingsProvider value={[settings, setSettings]}>
			<DialogProvider value={dialog}>

				<Router>
					<section className={classes(theme)}>
							<section className='container'>

								<Navbar pages={pages.filter(p => !!p.icon)} />
								<Dialog />

								<Switch>

									{pages.map(page =>
										<Route key={page.path} path={page.path}>
											<Page {...page} />
										</Route >
									)}

									<Route exact path='/'>
										<Redirect to='/home' />
									</Route>

									<Route>
										<Cell area='page'>
											<h1 className='empty-info'>404 - Not Found</h1>
										</Cell>
									</Route>

								</Switch>
							</section>
					</section>
				</Router>

			</DialogProvider>
		</SettingsProvider>
	);
}

export interface IPage {
	path: string;
	component: (() => JSX.Element | null) | MemoExoticComponent<() => JSX.Element | null>;
	id?: string;
	text?: string;
	icon?: IconDefinition;
}

const Page = (page: IPage) => {

	const path = useLocation().pathname.slice(1) + '/';
	const id = page.id ?? path.slice(0, path.indexOf('/'));

	useEffect(() => {
		document.title = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
	}, [id]);

	return (
		<Cell area='page' id={id}>
			<page.component />
		</Cell>
	);
}

export default App;
